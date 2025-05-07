'use client'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { Clipboard } from 'lucide-react'
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
      icon: <Clipboard className="h-4 w-4" />,
      description: 'You can now paste it anywhere'
    })
  }

  return (
    <button
      type="button"
      className="transition-opacity hover:opacity-75"
      onClick={handleCopyLink}
    >
      <Clipboard className="h-4 w-4" />
      <span className="sr-only">Copy Link</span>
    </button>
  )
}
