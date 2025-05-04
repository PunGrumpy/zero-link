'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { create } from 'zustand'

type Sort = 'newest' | 'oldest' | 'most-clicks' | 'least-clicks'

export const useSortLink = create<{
  sort: Sort
  setSort: (sort: Sort) => void
}>(set => ({
  sort: 'newest',
  setSort: (sort: Sort) => set({ sort })
}))

export const SortLink = () => {
  const { sort, setSort } = useSortLink()

  return (
    <Select
      value={sort}
      onValueChange={(value: Sort) => setSort(value)}
      defaultValue={sort}
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
