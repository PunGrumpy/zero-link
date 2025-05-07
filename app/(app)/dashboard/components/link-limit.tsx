import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Link, TriangleAlert } from 'lucide-react'

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
                <TriangleAlert className="h-4 w-4" />
              ) : (
                <Link className="h-4 w-4" />
              )}
              <span>
                {userLink < 10 ? `${userLink}` : userLink}
                {' / '}
                {maxLink < 10 ? `0${maxLink}` : maxLink}
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          You have {userLink} links out of {maxLink}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
