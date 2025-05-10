import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { formatDate } from '@/lib/utils'
import { MousePointerClick } from 'lucide-react'

type ShowClickProps = {
  clicks: number
  lastClick: Date | null
}

export const ShowClick = ({ clicks, lastClick }: ShowClickProps) => {
  return (
    <Tooltip>
      <TooltipTrigger className="flex justify-center space-x-2 text-xs">
        <MousePointerClick className="h-4 w-4" />
        <p className="font-mono">{clicks} clicks</p>
      </TooltipTrigger>
      <TooltipContent sideOffset={5}>
        {lastClick ? (
          <p>Last clicked is {formatDate(lastClick)}</p>
        ) : (
          <p>No clicks yet</p>
        )}
      </TooltipContent>
    </Tooltip>
  )
}
