const POLAR_ENVIRONMENT = process.env.POLAR_ENVIRONMENT

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
  }
}

export const getPlans = () => {
  return PLANS[POLAR_ENVIRONMENT as keyof typeof PLANS]
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
        customSlugs: false
      }
    case 'pro':
      return {
        links: 1000,
        customSlugs: true
      }
    default:
      return {
        links: 10,
        customSlugs: false
      }
  }
}
