import { HeroBadge } from '@/components/hero-badge'
import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
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

export const Plan = () => {
  return (
    <Section className="grid grid-cols-1 grid-rows-1 sm:h-fit">
      <div className="overflow-visible sm:auto-cols-auto sm:auto-rows-auto">
        <div className="flex flex-initial flex-col items-stretch sm:flex-row">
          <div className="relative flex w-full flex-col gap-8 text-balance px-8 py-12 md:border-r">
            <div className="flex flex-initial flex-col items-stretch gap-12">
              <div className="mt-auto flex flex-initial flex-col items-stretch gap-2">
                <div className="flex flex-initial items-center gap-2">
                  <div className="font-semibold text-xl md:text-2xl">
                    Starter
                  </div>
                </div>
                <div className="text-muted-foreground">
                  <div className="inline-block">
                    The perfect starting place for your shortening link.{' '}
                    <span className="text-foreground">Free forever</span>.
                  </div>
                </div>
                <div className="mt-6 flex flex-initial flex-col items-stretch gap-3">
                  <div className="flex flex-initial flex-row items-center gap-4">
                    <Link2 className="h-4 w-4" />
                    <div className="text-muted-foreground text-sm">
                      Basic URL shortening
                    </div>
                  </div>
                  <div className="flex flex-initial flex-row items-center gap-4">
                    <Link2Off className="h-4 w-4" />
                    <div className="text-muted-foreground text-sm">
                      Up to 10 links
                    </div>
                  </div>
                  <div className="flex flex-initial flex-row items-center gap-4">
                    <Shield className="h-4 w-4" />
                    <div className="text-muted-foreground text-sm">
                      No custom slugs
                    </div>
                  </div>
                  <div className="flex flex-initial flex-row items-center gap-4">
                    <MessageSquare className="h-4 w-4" />
                    <div className="text-muted-foreground text-sm">
                      Standard support
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="flex flex-initial flex-row items-stretch gap-4"
            >
              <Link
                href="/dashboard"
                className={cn(
                  'relative flex flex-1 shrink-0 items-center justify-between px-3 py-2',
                  'rounded-full font-medium text-sm transition-all',
                  'border hover:bg-accent dark:border-input dark:bg-input/30 dark:hover:bg-input/50'
                )}
              >
                Start Shortening <ArrowRight className="h-4 w-4" />
              </Link>
            </button>
          </div>

          <div className="relative flex w-full flex-col gap-8 text-balance border-t bg-input/30 px-8 py-12 md:border-t-0">
            <HeroBadge text="Most Popular" className="hidden sm:block" />
            <div className="flex flex-initial flex-col items-stretch gap-12">
              <div className="mt-auto flex flex-initial flex-col items-stretch gap-2">
                <div className="flex flex-initial items-center gap-2">
                  <div className="font-semibold text-xl md:text-2xl">Pro</div>
                  <Badge className="rounded-full sm:hidden">Most Popular</Badge>
                </div>
                <div className="text-muted-foreground">
                  <div className="inline-block">
                    Everything you need to shorten your links.{' '}
                    <span className="text-foreground">$10/month</span> + add'l
                    usage.
                  </div>
                </div>
                <div className="mt-6 flex flex-initial flex-col items-stretch gap-3">
                  <div className="flex flex-initial flex-row items-center gap-4">
                    <Zap className="h-4 w-4" />
                    <div className="text-muted-foreground text-sm">
                      Unlimited URL shortening
                    </div>
                  </div>
                  <div className="flex flex-initial flex-row items-center gap-4">
                    <Link2 className="h-4 w-4" />
                    <div className="text-muted-foreground text-sm">
                      Up to 1000 links
                    </div>
                  </div>
                  <div className="flex flex-initial flex-row items-center gap-4">
                    <Shield className="h-4 w-4" />
                    <div className="text-muted-foreground text-sm">
                      Custom slugs
                    </div>
                  </div>
                  <div className="flex flex-initial flex-row items-center gap-4">
                    <Users className="h-4 w-4" />
                    <div className="text-muted-foreground text-sm">
                      Priority support
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="flex flex-initial flex-row items-stretch gap-4"
            >
              <Link
                href="/api/auth/checkout/pro"
                className={cn(
                  'relative flex flex-1 shrink-0 items-center justify-between px-3 py-2',
                  'rounded-full font-medium text-sm transition-all',
                  'bg-blue-600 hover:brightness-90'
                )}
              >
                Upgrade Now <ArrowRight className="h-4 w-4" />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </Section>
  )
}
