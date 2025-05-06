'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export type Sort = 'newest' | 'oldest' | 'most-clicks' | 'least-clicks'

export const SortLink = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const currentSort = (searchParams.get('sort') as Sort) || 'newest'

  const handleSort = (value: Sort) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', value)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Select
      value={currentSort}
      onValueChange={handleSort}
      defaultValue={currentSort}
    >
      <SelectTrigger className="hidden sm:min-w-32 md:flex">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="oldest">Oldest</SelectItem>
        <SelectItem value="most-clicks">Most Clicks</SelectItem>
        <SelectItem value="least-clicks">Least Clicks</SelectItem>
      </SelectContent>
    </Select>
  )
}
