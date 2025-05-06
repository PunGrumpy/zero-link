'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { tag } from '@/db/schema'
import { cn, getTagColor } from '@/lib/utils'
import { Plus, Tag } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CreateTag } from './create-tag'

type SearchTagProps = {
  availableTags: (typeof tag.$inferSelect)[]
}

export const SearchTag = ({ availableTags }: SearchTagProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const currentTag = searchParams.get('tag')?.toString()

  const handleTagSelect = (tag: string) => {
    const params = new URLSearchParams(searchParams)
    if (tag === currentTag) {
      params.delete('tag')
    } else {
      params.set('tag', tag)
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-start font-normal"
          style={{
            ...getTagColor(
              availableTags.find(tag => tag.name === currentTag)?.color ?? null,
              false
            )
          }}
        >
          <Tag className="h-4 w-4" />
          {currentTag ? (
            <span className="truncate">{currentTag}</span>
          ) : (
            <span className="text-muted-foreground">Select tag</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="max-w-40 p-0">
        <ScrollArea>
          <div className="p-2">
            <CreateTag tags={availableTags}>
              <Button
                variant="secondary"
                className="w-full justify-start font-normal"
              >
                <Plus className="h-4 w-4" />
                Create new tag
              </Button>
            </CreateTag>
            <div className="my-2 border-t" />
            {availableTags.length > 0 ? (
              availableTags
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(tag => (
                  <Button
                    key={tag.id}
                    variant="ghost"
                    className={cn(
                      'w-full justify-start font-normal',
                      currentTag === tag.name && 'bg-accent'
                    )}
                    onClick={() => handleTagSelect(tag.name)}
                  >
                    <div
                      className="flex h-2 w-2 items-center justify-center rounded-full bg-primary text-primary-foreground"
                      style={{ backgroundColor: tag.color ?? '#000' }}
                    />
                    {tag.name}
                  </Button>
                ))
            ) : (
              <div className="text-center text-muted-foreground text-sm">
                No tags found
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
