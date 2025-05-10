import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { FileText } from 'lucide-react'

type DescriptionCardProps = {
  description: string
}

export const DescriptionCard = ({ description }: DescriptionCardProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <FileText className="h-4 w-4 transition-opacity hover:opacity-75" />
      </TooltipTrigger>
      <TooltipContent>{description}</TooltipContent>
    </Tooltip>
  )
}
