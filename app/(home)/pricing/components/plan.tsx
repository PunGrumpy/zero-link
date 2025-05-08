import { Section } from '@/components/section'
import { getPlans } from '@/lib/plans'
import { cn } from '@/lib/utils'
import {
  ArrowRight,
  Link2,
  Link2Off,
  MessageSquare,
  Shield,
  Users,
  Zap
} from 'lucide-react'
import Link from 'next/link'

const products = {
  starter: {
    name: 'Starter',
    description: (
      <div className="inline-block">
        The perfect starting place for your shortening link.{' '}
        <span className="text-foreground">Free forever</span>.
      </div>
    ),
    features: [
      {
        icon: <Link2 className="h-4 w-4" />,
        description: 'Basic URL shortening'
      },
      { icon: <Link2Off className="h-4 w-4" />, description: 'Up to 10 links' },
      { icon: <Shield className="h-4 w-4" />, description: 'No custom slugs' },
      {
        icon: <MessageSquare className="h-4 w-4" />,
        description: 'Standard support'
      }
    ],
    button: (
      <button
        type="button"
        className="flex flex-initial flex-row items-stretch gap-4"
      >
        <Link
          href="/"
          className={cn(
            'relative flex flex-1 shrink-0 items-center justify-between px-3 py-2',
            'rounded-full font-medium text-sm transition-all',
            'border hover:bg-accent dark:border-input dark:bg-input/30 dark:hover:bg-input/50'
          )}
        >
          Start Shortening <ArrowRight className="h-4 w-4" />
        </Link>
      </button>
    )
  },
  pro: {
    name: 'Pro',
    description: (
      <div className="inline-block">
        Everything you need to shorten your links.{' '}
        <span className="text-foreground">$10/month</span> + add'l usage.
      </div>
    ),
    features: [
      {
        icon: <Zap className="h-4 w-4" />,
        description: 'Unlimited URL shortening'
      },
      { icon: <Link2 className="h-4 w-4" />, description: 'Up to 1000 links' },
      { icon: <Shield className="h-4 w-4" />, description: 'Custom slugs' },
      { icon: <Users className="h-4 w-4" />, description: 'Priority support' }
    ],
    button: (
      <button
        type="button"
        className="flex flex-initial flex-row items-stretch gap-4"
      >
        <Link
          href="/"
          className={cn(
            'relative flex flex-1 shrink-0 items-center justify-between px-3 py-2',
            'rounded-full font-medium text-sm transition-all',
            'bg-blue-600 hover:brightness-90'
          )}
        >
          Upgrade Now <ArrowRight className="h-4 w-4" />
        </Link>
      </button>
    )
  }
}

export const Plan = () => {
  const plans = getPlans()

  return (
    <Section className="grid grid-cols-1 grid-rows-1 sm:h-fit">
      <div className="overflow-visible sm:auto-cols-auto sm:auto-rows-auto">
        <div className="flex flex-initial flex-row items-stretch">
          {Object.values(plans).map((plan, index) => (
            <div
              key={plan.id}
              className={cn(
                'relative flex w-full flex-col gap-8 text-balance border-r px-8 py-12',
                index % 2 === 1 && 'bg-input/30',
                index === Object.values(plans).length - 1 && 'border-r-0'
              )}
            >
              <div className="flex flex-initial flex-col items-stretch gap-12">
                <div className="mt-auto flex flex-initial flex-col items-stretch gap-2">
                  <div className="flex flex-initial items-center gap-2">
                    <div className="font-semibold text-xl md:text-2xl">
                      {products[plan.key as keyof typeof products].name}
                    </div>
                  </div>
                  <div className="text-muted-foreground">
                    {products[plan.key as keyof typeof products].description}
                  </div>
                  <div className="mt-6 flex flex-initial flex-col items-stretch gap-3">
                    {products[plan.key as keyof typeof products].features.map(
                      (feature, index) => (
                        <div
                          key={index}
                          className="flex flex-initial flex-row items-center gap-4"
                        >
                          {feature.icon}
                          <div className="text-muted-foreground text-sm">
                            {feature.description}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              {products[plan.key as keyof typeof products].button}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
