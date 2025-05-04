import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Package, TriangleAlert } from 'lucide-react'

type LinkLimitProps = {
  userLink: number
  maxLink: number
}

export const LinkLimit = ({ userLink, maxLink }: LinkLimitProps) => {
  const maxLimit = userLink >= maxLink
  const midLimit = userLink >= maxLink / 2

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              buttonVariants({
                variant: 'outline'
              }),
              'hidden md:flex'
            )}
          >
            <div
              className={cn(
                midLimit ? 'text-yellow-500' : '',
                maxLimit ? 'text-red-500' : '',
                'flex items-center space-x-2'
              )}
            >
              {maxLimit ? (
                <TriangleAlert className="size-4" />
              ) : (
                <Package className="size-4" />
              )}
              <span>
                {userLink < 10 ? `${userLink}` : userLink}
                {'/'}
                {maxLink < 10 ? `0${maxLink}` : maxLink}
              </span>
            </div>
          </div>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  )
}
