import { db } from '@/db'
import * as schema from '@/db/schema'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin, twoFactor } from 'better-auth/plugins'
import { env } from './env'

const baseUrl = env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

export const Plan = {
  Starter: {
    productId: 'aa6e0754-83c0-496a-adb4-63c3a28a065a',
    slug: 'starter'
  },
  Pro: {
    productId: '74b7a038-8254-47b5-8ef3-7d83380dc75f',
    slug: 'pro'
  }
}

export const auth = betterAuth({
  appName: 'Zero Link',
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
  plugins: [admin(), twoFactor(), nextCookies()]
})
