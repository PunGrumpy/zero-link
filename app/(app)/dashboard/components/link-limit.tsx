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
  maxLinks: number
}

export const LinkLimit = ({ userLink, maxLinks }: LinkLimitProps) => {
  const maxLimit = userLink >= maxLinks
  const midLimit = userLink >= maxLinks / 2

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
                {maxLinks < 10 ? `0${maxLinks}` : maxLinks}
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          You have {userLink} links out of {maxLinks}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
