import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type PlanBadgeProps = {
  plan: string
}

export const PlanBadge = ({ plan }: PlanBadgeProps) => {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'flex items-center gap-1 rounded-full px-2 py-0.5 capitalize',
        'bg-green-500/20 text-green-500',
        plan === 'pro' && 'bg-blue-500/20 text-blue-500',
        plan === 'owner' && 'bg-red-500/20 text-red-500'
      )}
    >
      {plan}
    </Badge>
  )
}
