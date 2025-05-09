import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

const Cross = () => (
  <div className="relative z-50 grid h-4 w-4 self-center md:h-5 md:w-5">
    <div className="absolute h-4 w-2 border-muted-foreground border-r md:h-5 md:w-2.5" />
    <div className="absolute h-2 w-4 border-muted-foreground border-b md:h-2.5 md:w-5" />
  </div>
)

type SectionProps = HTMLAttributes<HTMLDivElement> & {
  crossPosition?: 'top-left' | 'bottom-right' | 'both' | 'none'
  className?: string
}

export const Section = ({
  children,
  crossPosition = 'none',
  className,
  ...props
}: SectionProps) => {
  return (
    <section {...props} className="mx-4">
      <div className="relative mx-auto max-w-6xl">
        <div className={cn('border-x', className)}>{children}</div>
        {(crossPosition === 'top-left' || crossPosition === 'both') && (
          <div className="-top-2 -left-2 md:-top-2.5 md:-left-2.5 absolute z-10 block">
            <Cross />
          </div>
        )}
        {(crossPosition === 'bottom-right' || crossPosition === 'both') && (
          <div className="-bottom-2 -right-2 md:-bottom-2.5 md:-right-2.5 absolute z-10 block">
            <Cross />
          </div>
        )}
      </div>
    </section>
  )
}
