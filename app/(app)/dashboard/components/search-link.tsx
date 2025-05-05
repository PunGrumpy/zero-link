'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const SearchLink = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="relative w-full">
      <Search className="-translate-y-1/2 absolute top-1/2 left-2 h-4 w-4" />
      <Input
        type="search"
        autoComplete="off"
        placeholder="Search everthing to see"
        className="pl-8"
        onChange={e => handleSearch(e.target.value)}
        defaultValue={searchParams.get('search')?.toString()}
      />
    </div>
  )
}
