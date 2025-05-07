import { db } from '@/db'
import * as schema from '@/db/schema'
import { polar } from '@polar-sh/better-auth'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin, twoFactor } from 'better-auth/plugins'
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
      limitLinks: {
        type: 'number',
        defaultValue: 10,
        required: true
      }
    },
    deleteUser: {
      enabled: true
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
      }
    }),
    nextCookies()
  ]
})
