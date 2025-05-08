import { createEnv } from '@t3-oss/env-nextjs'
import { vercel } from '@t3-oss/env-nextjs/presets-zod'
import { z } from 'zod'

export const env = createEnv({
  extends: [vercel()],
  server: {
    DATABASE_URL: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().min(1).url(),
    DISCORD_CLIENT_ID: z.string().min(1),
    DISCORD_CLIENT_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    BETTERSTACK_API_KEY: z.string().min(1),
    BETTERSTACK_URL: z.string().min(1).url(),
    POLAR_ACCESS_TOKEN: z.string().startsWith('polar_oat_'),
    POLAR_ENVIRONMENT: z.enum(['production', 'sandbox']),
    POLAR_WEBHOOK_SECRET: z.string().min(1)
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    BETTERSTACK_API_KEY: process.env.BETTERSTACK_API_KEY,
    BETTERSTACK_URL: process.env.BETTERSTACK_URL,
    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
    POLAR_ENVIRONMENT: process.env.POLAR_ENVIRONMENT,
    POLAR_WEBHOOK_SECRET: process.env.POLAR_WEBHOOK_SECRET
  }
})
