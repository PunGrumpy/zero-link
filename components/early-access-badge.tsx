import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Ticket } from 'lucide-react'

type EarlyAccessBadgeProps = {
  isEarlyAccess: boolean
  className?: string
}

export const EarlyAccessBadge = ({
  isEarlyAccess,
  className
}: EarlyAccessBadgeProps) => {
  if (!isEarlyAccess) {
    return null
  }

  return (
    <Badge
      variant="secondary"
      className={cn(
        'flex items-center gap-1 rounded-full px-2 py-0.5',
        'border-yellow-500/50 bg-yellow-500/20',
        className
      )}
    >
      <Ticket className="h-3 w-3" />
      <span>Early Access</span>
    </Badge>
  )
}
