import { type LinkWithTag, getLinkandTagByUser } from '@/app/(app)/actions/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { CardLink } from './components/card-link'
import { CreateLink } from './components/create-link'
import { LinkLimit } from './components/link-limit'
import { SearchLink } from './components/search-link'
import { SortLink } from './components/sort-link'

const filterLinks = (
  links: LinkWithTag[],
  searchLink?: string,
  searchTag?: string
) => {
  return links.filter(link => {
    if (!searchLink && !searchTag) {
      return true
    }

    const matchSlug =
      !searchLink ||
      link.slug.toLocaleLowerCase().includes(searchLink.toLocaleLowerCase())
    const matchTag = !searchTag || link.tags.some(tag => tag.id === searchTag)

    return matchSlug && matchTag
  })
}

type DashboardPageProps = {
  searchParams: Promise<{
    search?: string
    tag?: string
    sort?: 'newest' | 'oldest' | 'most-clicks' | 'least-clicks'
  }>
}

export default async function DashboardPage({
  searchParams
}: DashboardPageProps) {
  const {
    search: searchLink,
    tag: searchTag,
    sort = 'newest'
  } = await searchParams
  const { links, tags, limit } = await getLinkandTagByUser(sort)

  if (!links) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="font-bold text-3xl">No links found</h1>
      </div>
    )
  }

  const filteredLinks = filterLinks(links, searchLink, searchTag)

  return (
    <>
      <div className="flex flex-initial flex-row items-center gap-3">
        <SearchLink />
        <LinkLimit userLink={links.length} maxLink={limit} />
        <SortLink />
        <CreateLink tags={tags}>
          <Button>
            <Plus className="flex h-4 w-4 md:hidden" />
            <p className="hidden capitalize md:flex">Add new link</p>
          </Button>
        </CreateLink>
      </div>
      <CardLink filteredLink={filteredLinks} />
    </>
  )
}
