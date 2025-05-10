import { AnimatedEmptyState } from '@/components/animated-empty-state'
import { Globe } from '@/components/globe'
import { Section } from '@/components/section'
import { cn } from '@/lib/utils'
import { Globe2, Link, MousePointerClick, ShieldCheck, Zap } from 'lucide-react'

const features = [
  {
    icon: <Zap className="h-4 w-4" />,
    caption: 'Lightning Fast',
    title: (
      <>
        <strong className="text-foreground">Experience instant</strong>{' '}
        redirects and analytics with our optimized infrastructure.
      </>
    ),
    showcase: (
      <AnimatedEmptyState
        className="h-fit border-0 py-0"
        cardContent={
          <>
            <Link className="h-3 w-3 text-muted-foreground" />
            <div className="h-2.5 w-24 min-w-0 rounded-sm bg-input" />
            <div className="flex grow items-center justify-end gap-1.5 text-muted-foreground">
              <MousePointerClick className="h-3 w-3" />
            </div>
          </>
        }
      />
    )
  },
  {
    icon: <Globe2 className="h-4 w-4" />,
    caption: 'Global Reach',
    title: (
      <>
        <strong className="text-foreground">
          Your links are available everywhere
        </strong>
        , instantly, with our global CDN.
      </>
    ),
    showcase: <Globe />
  },
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    caption: 'Secure & Reliable',
    title: (
      <>
        <strong className="text-foreground">Privacy-first</strong>, secure, and
        always online. Your data is safe with us.
      </>
    ),
    showcase: <>idk, what to put here</>
  }
]

export const Feature = () => {
  return (
    <Section className="grid grid-cols-1 grid-rows-3 sm:h-fit md:grid-cols-3 md:grid-rows-1">
      {features.map(({ icon, caption, title, showcase }, index) => (
        <div
          key={index}
          className={cn(
            'p-12',
            index !== features.length - 1 && 'md:border-r',
            index !== 0 && 'border-t md:border-t-0'
          )}
        >
          <div className="flex flex-initial flex-col items-stretch gap-12">
            <div className="flex flex-initial flex-col items-stretch gap-2 md:gap-4">
              <div className="flex flex-initial flex-row items-center justify-between">
                <div className="flex flex-initial flex-row items-center gap-2 text-muted-foreground">
                  {icon}
                  <h2 className="text-sm md:text-base">{caption}</h2>
                </div>
              </div>
              <div className="flex flex-initial flex-col items-center gap-4 md:flex-row md:gap-10">
                <div className="font-medium text-2xl text-muted-foreground">
                  {title}
                </div>
              </div>
            </div>
            <div className="visible">{showcase}</div>
          </div>
        </div>
      ))}
    </Section>
  )
}
