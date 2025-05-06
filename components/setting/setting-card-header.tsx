import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { CardDescription, CardHeader, CardTitle } from '../ui/card'

type SettingCardHeaderProps = {
  title: ReactNode
  description?: ReactNode
  className?: string
}

export const SettingCardHeader = ({
  title,
  description,
  className
}: SettingCardHeaderProps) => {
  return (
    <CardHeader className={cn(className)}>
      <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
      {description && (
        <CardDescription className="text-xs md:text-sm">
          {description}
        </CardDescription>
      )}
    </CardHeader>
  )
}
