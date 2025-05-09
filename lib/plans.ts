import {} from 'lucide-react'
import { env } from './env'

export const PLANS = {
  production: {
    starter: {
      id: 'b572d112-1bc4-465f-b31f-68e1f901640f',
      name: 'Starter',
      key: 'starter'
    },
    pro: {
      id: '74b7a038-8254-47b5-8ef3-7d83380dc75f',
      name: 'Pro',
      key: 'pro'
    }
  },
  sandbox: {
    starter: {
      id: '442c06cb-8290-4a00-b30e-bf925407ba60',
      name: 'Starter',
      key: 'starter'
    },
    pro: {
      id: '411a2e0c-cc93-4ddd-8552-e21761c3826f',
      name: 'Pro',
      key: 'pro'
    }
  }
}

export const getPlans = () => {
  return PLANS[env.POLAR_ENVIRONMENT as keyof typeof PLANS]
}

export const getPlanByProductId = (productId: string) => {
  const plan = Object.values(getPlans()).find(plan => plan.id === productId)

  if (!plan) {
    throw new Error(`Plan with productId ${productId} not found`)
  }

  return plan.key
}

export const getPlanLimit = (plan: string) => {
  switch (plan) {
    case 'starter':
      return {
        links: 10,
        isCustomSlugs: false
      }
    case 'pro':
      return {
        links: 1000,
        isCustomSlugs: true
      }
    default:
      return {
        links: 10,
        isCustomSlugs: false
      }
  }
}
