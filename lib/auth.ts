import { db } from '@/db'
import * as schema from '@/db/schema'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin, twoFactor } from 'better-auth/plugins'
import { env } from './env'

export const auth = betterAuth({
  appName: 'Zeus',
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema
  }),
  user: {
    additionalFields: {
      limitLinks: {
        type: 'number',
        defaultValue: 10,
        required: true
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
  plugins: [admin(), twoFactor(), nextCookies()]
})
