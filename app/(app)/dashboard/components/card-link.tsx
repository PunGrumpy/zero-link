import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { tag } from '@/db/schema'
import { env } from '@/lib/env'
import { cn, formatDate, getTagColor } from '@/lib/utils'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import type { LinkWithTag } from '../../actions/link'
import { CopyLink } from './copy-link'
import { DeleteLink } from './delete-link'
import { DescriptionCard } from './description-card'
import { EditLink } from './edit-link'
import { QRCode } from './qr-code'
import { ShowClick } from './show-click'

type CardLinkProps = {
  tags: (typeof tag.$inferSelect)[]
  filteredLink: LinkWithTag[]
}

export const CardLink = async ({ tags, filteredLink }: CardLinkProps) => {
  const baseUrl = env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000'

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      {filteredLink.map(link => (
        <div
          key={link.id}
          className={cn(
            'flex min-h-32 flex-initial flex-col items-stretch justify-between gap-4 rounded-md px-5 py-4 transition-all duration-300',
            'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50'
          )}
        >
          <section className="flex flex-initial items-start justify-between gap-4">
            <div className="flex flex-col gap-0.5 overflow-hidden">
              <Link
                href={`${baseUrl}/${link.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
                passHref
              >
                {baseUrl}/{link.slug}
              </Link>
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-2xs truncate text-muted-foreground text-xs hover:underline"
              >
                {link.url}
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <ShowClick clicks={link.clicks} lastClick={link.lastClicked} />
              <CopyLink baseUrl={baseUrl} slug={link.slug} />
              {link.description && (
                <DescriptionCard description={link.description} />
              )}
              <DropdownMenu>
                <DropdownMenuTrigger className="transition-opacity hover:opacity-75">
                  <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="grid gap-0.5">
                  <QRCode baseUrl={baseUrl} linkInfo={link} />
                  <EditLink link={link} tags={tags} />
                  <DeleteLink slug={link.slug} />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </section>

          <section className="flex flex-initial flex-col items-start gap-3">
            <p className="text-muted-foreground text-xs">
              Created on {formatDate(link.createdAt)}
            </p>
          </section>

          <span className="flex flex-row items-stretch gap-2">
            {link.tags.map(tag => (
              <div
                key={tag.id}
                className={cn(
                  'inline-flex items-center justify-center gap-2 whitespace-nowrap',
                  'border text-xs lowercase',
                  'h-6 rounded-full px-2 py-0.5'
                )}
                style={{
                  ...getTagColor(tag.color, false)
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
