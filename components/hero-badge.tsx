import { cn } from '@/lib/utils'

type HeroBadgeProps = {
  text: string
  className?: string
}

export const HeroBadge = ({ text, className }: HeroBadgeProps) => {
  return (
    <div
      className={cn(
        'box-border flex flex-initial flex-col items-center justify-center',
        '-top-8 -left-px absolute rounded-tr-xl bg-foreground px-3 py-1.5 text-center',
        className
      )}
    >
      <p className="w-fit font-medium text-background text-sm">{text}</p>
    </div>
  )
}
