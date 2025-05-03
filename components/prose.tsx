import components from '@/components.json'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type ProseProps = ComponentProps<'div'>

export const Prose = ({ className, ...props }: ProseProps) => (
  <div
    className={cn(
      'prose dark:prose-invert',
      `prose-${components.tailwind.baseColor}`,
      className
    )}
    {...props}
  />
)
