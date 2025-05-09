import { db } from '@/db'
import { getPlanLimit, getPlans } from '@/lib/plans'
import { plan } from './schema'

const main = async () => {
  const plans = getPlans()

  const allPlans = [
    // Starter plan
    {
      id: plans.starter.id,
      name: plans.starter.name,
      key: plans.starter.key,
      linksLimit: getPlanLimit(plans.starter.key).links,
      customSlugs: getPlanLimit(plans.starter.key).customSlugs
    },
    // Pro plan
    {
      id: plans.pro.id,
      name: plans.pro.name,
      key: plans.pro.key,
      linksLimit: getPlanLimit(plans.pro.key).links,
      customSlugs: getPlanLimit(plans.pro.key).customSlugs
    }
  ]

  // Insert all plans
  await db.insert(plan).values(allPlans).onConflictDoNothing()

  console.log('✅ Plans seeded successfully')
}

main().catch(e => {
  console.error('❌ Seed failed')
  console.error(e)
  process.exit(1)
})
