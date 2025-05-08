import { Hero } from './components/hero'
import { Plan } from './components/plan'

const features = {
  free: [
    'Basic URL shortening',
    'Up to 100 links per month',
    'Basic analytics',
    'Standard support'
  ],
  pro: [
    'Unlimited URL shortening',
    'Custom domains',
    'Advanced analytics',
    'Priority support',
    'API access',
    'Team collaboration'
  ]
}

export default function PricingPage() {
  return (
    <>
      <Hero />
      <Plan />
    </>
  )
}
