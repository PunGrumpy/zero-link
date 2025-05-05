'use client'

import { buttonVariants } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn, formatDate, getTagBackgroundColor } from '@/lib/utils'
import { Copy, QrCode } from 'lucide-react'
import Link from 'next/link'
import type { LinkWithTag } from '../actions/link'
import { CopyLink } from './copy-link'
import { QRCode } from './qr-code'
import { ShowClick } from './show-click'
import { useSortLink } from './sort-link'

type CardLinkProps = {
  filteredLink: LinkWithTag[]
}

export const CardLink = ({ filteredLink }: CardLinkProps) => {
  const { sort } = useSortLink()

  const sortedLinks = filteredLink.sort((a, b) => {
    if (sort === 'newest') {
      return b.createdAt.getTime() - a.createdAt.getTime()
    }

    if (sort === 'oldest') {
      return a.createdAt.getTime() - b.createdAt.getTime()
    }

    if (sort === 'most-clicks') {
      return b.clicks - a.clicks
    }

    if (sort === 'least-clicks') {
      return a.clicks - b.clicks
    }

    return 0
  })

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      {sortedLinks.map(link => (
        <div
          key={link.id}
          className={cn(
            'flex min-h-32 flex-initial flex-col items-stretch justify-between gap-4 rounded-md px-5 py-4 transition-all duration-300',
            'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50'
          )}
        >
          <section className="flex flex-initial items-stretch justify-between gap-4">
            <Link
              href={`/${link.slug}`}
              className="flex items-center justify-center gap-2 overflow-hidden"
              passHref
            >
              <p className="truncate font-medium hover:underline">
                {link.slug}
              </p>
            </Link>

            <div className="flex items-center gap-3">
              <ShowClick clicks={link.clicks} lastClick={link.lastClicked} />
              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger className="transition-opacity hover:opacity-75">
                    <Copy className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <CopyLink slug={link.slug} />
                    <DialogTrigger asChild>
                      <DropdownMenuItem>
                        <QrCode className="h-4 w-4" /> Copy QR Code
                      </DropdownMenuItem>
                    </DialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
                <QRCode linkInfo={link} />
              </Dialog>
            </div>
          </section>

          <section className="flex-initial flex-row items-center gap-4">
            <p className="text-muted-foreground text-sm">
              {link.description ? link.description : 'No description'}
            </p>
            <p className="text-muted-foreground text-sm">
              Created on {formatDate(link.createdAt)}
            </p>
          </section>

          <span className="flex flex-row items-stretch gap-2">
            {link.tags.map(tag => (
              <div
                key={tag.id}
                className={buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                  className: 'text-xs lowercase'
                })}
                style={{
                  borderRadius: '9999px',
                  padding: '0.5rem 0.75rem',
                  backgroundColor: getTagBackgroundColor(tag.color, false),
                  borderColor: tag.color ? `${tag.color}8D` : ''
                }}
              >
                {tag.name}
              </div>
            ))}
          </span>
        </div>
      ))}
    </div>
  )
}
