'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { Clipboard, Link } from 'lucide-react'
import { toast } from 'sonner'

type CopyLinkProps = {
  baseUrl: string
  slug: string
}

export const CopyLink = ({ baseUrl, slug }: CopyLinkProps) => {
  const { copyToClipboard } = useCopyToClipboard()

  const handleCopyLink = () => {
    copyToClipboard(`${baseUrl}/${slug}`)
    toast.success('Link copied to clipboard', {
      icon: <Link className="h-4 w-4" />,
      description: 'You can now paste it anywhere'
    })
  }

  return (
    <DropdownMenuItem onClick={handleCopyLink}>
      <Clipboard className="h-4 w-4" /> Copy Link
    </DropdownMenuItem>
  )
}
