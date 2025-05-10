'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react'
import { Badge } from './ui/badge'
import { buttonVariants } from './ui/button'

type AnimatedEmptyStateProps = {
  title?: string
  description?: string
  cardContent: ReactNode | ((index: number) => ReactNode)
  addButton?: ReactNode
  pillContent?: string
  learnMoreHref?: string
  learnMoreClassName?: string
  learnMoreText?: string
  className?: string
}

export const AnimatedEmptyState = ({
  title,
  description,
  cardContent,
  addButton,
  pillContent,
  learnMoreHref,
  learnMoreClassName,
  learnMoreText,
  className
}: AnimatedEmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-6 rounded-lg border px-4 py-10',
        className
      )}
    >
      <div className="h-36 w-full max-w-64 animate-in overflow-hidden px-4 [mask-image:linear-gradient(transparent,black_10%,black_90%,transparent)]">
        <div
          style={{ '--scroll': '-50%' } as CSSProperties}
          className="flex animate-infinite-scroll-y flex-col [animation-duration:10s]"
        >
          {[...new Array(6)].map((_, idx) => (
            <Card key={idx}>
              {typeof cardContent === 'function'
                ? cardContent(idx % 3)
                : cardContent}
            </Card>
          ))}
        </div>
      </div>
      {pillContent && <Badge variant="default">{pillContent}</Badge>}
      <div className="max-w-sm text-pretty text-center">
        <span className="font-medium">{title}</span>
        <p className="mt-2 text-pretty text-muted-foreground text-sm">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {addButton}
        {learnMoreHref && (
          <Link
            href={learnMoreHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: addButton ? 'secondary' : 'default' }),
              'flex h-9 items-center whitespace-nowrap rounded-lg border px-4 text-sm',
              learnMoreClassName
            )}
          >
            {learnMoreText || 'Learn more'}
          </Link>
        )}
      </div>
    </div>
  )
}

export const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-lg border p-4 shadow-[0_4px_12px_0_#0000000D] dark:bg-input/30">
      {children}
    </div>
  )
}
