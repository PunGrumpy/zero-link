import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { CardDescription, CardFooter } from '../ui/card'
import { SettingActionButton } from './setting-action-button'

type SettingCardFooterProps = {
  actionLabel?: ReactNode
  instructions?: ReactNode
  variant?: 'default' | 'destructive'
  action?: () => Promise<unknown> | unknown
}

export const SettingCardFooter = ({
  actionLabel,
  instructions,
  variant,
  action
}: SettingCardFooterProps) => {
  return (
    <CardFooter
      className={cn(
        'flex flex-col justify-between gap-4 rounded-b-xl md:flex-row',
        (actionLabel || instructions) && '!py-4 border-t',
        variant === 'destructive'
          ? 'border-destructive/30 bg-destructive/10'
          : 'bg-muted dark:bg-transparent'
      )}
    >
      {instructions && (
        <CardDescription className="text-muted-foreground text-xs md:text-sm">
          {instructions}
        </CardDescription>
      )}

      {actionLabel && (
        <SettingActionButton
          actionLabel={actionLabel}
          variant={variant}
          onClick={action}
        />
      )}
    </CardFooter>
  )
}
