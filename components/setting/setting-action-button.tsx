import type { ComponentProps, ReactNode } from 'react'
import { Button } from '../ui/button'

type SettingActionButtonProps = ComponentProps<typeof Button> & {
  actionLabel: ReactNode
}

export const SettingActionButton = ({
  actionLabel,
  variant,
  onClick,
  ...props
}: SettingActionButtonProps) => {
  return (
    <Button
      variant={variant}
      size="sm"
      className="md:ms-auto"
      onClick={onClick}
      {...props}
    >
      {actionLabel}
    </Button>
  )
}
