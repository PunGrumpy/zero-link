import { getLinkandTagByUser } from '@/app/(app)/actions/link'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { createMetadata } from '@/lib/metadata'
import { getPlanLimit, getPlans } from '@/lib/plans'
import { Plus } from 'lucide-react'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getTags } from '../actions/tag'
import { CardLink } from './components/card-link'
import { CreateLink } from './components/create-link'
import { LinkLimit } from './components/link-limit'
import { SearchLink } from './components/search-link'
import { SearchTag } from './components/search-tag'
import { SortLink } from './components/sort-link'

const title = 'Dashboard - Zero Link'
const description = 'Dashboard for managing your links'

export const metadata: Metadata = createMetadata(title, description)

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
  const { links, tags } = await getLinkandTagByUser(sort, searchLink, searchTag)
  const availableTags = await getTags()
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const { activeSubscriptions } = await auth.api.polarCustomerState({
    headers: await headers()
  })

  const isPro =
    session?.user.role === 'owner' ||
    (activeSubscriptions?.length > 0 &&
      activeSubscriptions[0].productId === getPlans().pro.id &&
      activeSubscriptions[0].status === 'active' &&
      !activeSubscriptions[0].canceledAt &&
      activeSubscriptions[0].currentPeriodEnd &&
      new Date(activeSubscriptions[0].currentPeriodEnd) > new Date())

  const { isCustomSlugs, links: maxLinks } = getPlanLimit(
    isPro ? getPlans().pro.key : getPlans().starter.key
  )

  if (!links) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="font-bold text-3xl">No links found</h1>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-initial flex-row items-center gap-3">
        <SearchLink />
        <SearchTag availableTags={availableTags} />
        <LinkLimit userLink={links.length} maxLinks={maxLinks} />
        <SortLink />
        <CreateLink tags={tags} isCustomSlugs={isCustomSlugs}>
          <Button>
            <Plus className="flex h-4 w-4 md:hidden" />
            <p className="hidden capitalize md:flex">Add new link</p>
          </Button>
        </CreateLink>
      </div>
      <CardLink
        tags={tags}
        filteredLink={links}
        isCustomSlugs={isCustomSlugs}
      />
    </>
  )
}
