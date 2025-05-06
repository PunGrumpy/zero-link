import { Section } from '@/components/section'
import { cn } from '@/lib/utils'
import { Globe, ShieldCheck, Zap } from 'lucide-react'

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
    showcase: <>idk, what to put here</>
  },
  {
    icon: <Globe className="h-4 w-4" />,
    caption: 'Global Reach',
    title: (
      <>
        <strong className="text-foreground">
          Your links are available everywhere
        </strong>
        , instantly, with our global CDN.
      </>
    ),
    showcase: <>idk, what to put here</>
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
          className={cn('p-12', index !== features.length - 1 && 'border-r')}
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
