import { Polar } from '@polar-sh/sdk'
import { env } from './env'

export const client = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: env.POLAR_ENVIRONMENT
})
