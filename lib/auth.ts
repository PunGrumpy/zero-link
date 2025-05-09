import { db } from '@/db'
import * as schema from '@/db/schema'
import { polar } from '@polar-sh/better-auth'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin, twoFactor } from 'better-auth/plugins'
import { eq } from 'drizzle-orm'
import { env } from './env'
import { getPlans } from './plans'
import { client } from './polar'

const baseUrl = env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

export const auth = betterAuth({
  appName: 'Zero Link',
  baseURL: baseUrl,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema
  }),
  trustedOrigins: [baseUrl],
  user: {
    additionalFields: {
      planId: {
        type: 'string',
        required: false
      }
    },
    deleteUser: {
      enabled: true,
      afterDelete: async user => {
        await client.customers.delete({
          id: user.id
        })
      }
    }
  },
  socialProviders: {
    discord: {
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET
    }
  },
  plugins: [
    admin(),
    twoFactor(),
    polar({
      client,
      createCustomerOnSignUp: true,
      enableCustomerPortal: true,
      checkout: {
        enabled: true,
        products: [
          {
            productId: getPlans().starter.id,
            slug: getPlans().starter.key
          },
          {
            productId: getPlans().pro.id,
            slug: getPlans().pro.key
          }
        ],
        successUrl: '/checkout/success?redirectPath=/dashboard'
      },
      webhooks: {
        secret: env.POLAR_WEBHOOK_SECRET,
        onSubscriptionActive: async subscription => {
          await db.update(schema.user).set({
            planId: subscription.data.id
          })
        },
        onSubscriptionUpdated: async subscription => {
          await db
            .update(schema.user)
            .set({
              planId: subscription.data.id
            })
            .where(eq(schema.user.id, subscription.data.id))
        },
        // Subscription has been explicitly canceled by the user
        onSubscriptionCanceled: async subscription => {
          await db
            .update(schema.user)
            .set({
              planId: null
            })
            .where(eq(schema.user.id, subscription.data.id))
        },
        // Subscription has been revoked/peroid has ended with no renewal
        onSubscriptionRevoked: async subscription => {
          await db
            .update(schema.user)
            .set({
              planId: null
            })
            .where(eq(schema.user.id, subscription.data.id))
        }
      }
    }),
    nextCookies()
  ]
})
