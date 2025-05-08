'use server'

import { db } from '@/db'
import { link, linkTag, tag } from '@/db/schema'
import { auth } from '@/lib/auth'
import { count, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { z } from 'zod'
import type { formSchema } from '../dashboard/components/create-link'
import type { Sort } from '../dashboard/components/sort-link'

export type LinkWithTag = typeof link.$inferSelect & {
  tags: (typeof tag.$inferSelect)[]
}

export const getLinkandTagByUser = async (
  sort: Sort
): Promise<{
  links: LinkWithTag[]
  tags: (typeof tag.$inferSelect)[]
}> => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  const links = await db
    .select({
      link: link,
      tag: tag
    })
    .from(link)
    .leftJoin(linkTag, eq(link.id, linkTag.linkId))
    .leftJoin(tag, eq(linkTag.tagId, tag.id))
    .where(eq(link.createdBy, session.user.id))
    .then(results => {
      const grouped = results.reduce(
        (acc, { link, tag }) => {
          if (!acc[link.id]) {
            acc[link.id] = {
              ...link,
              tags: []
            }
          }
          if (tag) {
            acc[link.id].tags.push(tag)
          }
          return acc
        },
        {} as Record<string, LinkWithTag>
      )
      return Object.values(grouped)
    })

  const sortedLinks = links.sort((a, b) => {
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

  const tags = await db
    .select()
    .from(tag)
    .where(eq(tag.createdBy, session.user.id))

  return {
    links: sortedLinks,
    tags
  }
}

export const isSlugExists = async (slug: string): Promise<boolean> => {
  const result = await db.query.link.findFirst({
    where: eq(link.slug, slug)
  })

  return !!result
}

export const createLink = async (
  value: z.infer<typeof formSchema>
): Promise<{
  success: boolean
  message: string
}> => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  const countLink = await db
    .select({
      count: count()
    })
    .from(link)
    .where(eq(link.createdBy, session.user.id))

  if (countLink[0].count >= 10) {
    return {
      success: false,
      message: 'You have reached the limit of links.'
    }
  }

  const [newLink] = await db
    .insert(link)
    .values({
      slug: value.slug,
      url: value.url,
      description: value.description,
      createdBy: session.user.id
    })
    .returning()

  if (value.selectedTags && value.selectedTags.length > 0) {
    await db.insert(linkTag).values(
      value.selectedTags.map(tagId => ({
        linkId: newLink.id,
        tagId
      }))
    )
  }

  revalidatePath('/dashboard')

  return {
    success: true,
    message: 'Link created successfully.'
  }
}

export const deleteLink = async (
  slug: string
): Promise<{
  success: boolean
  message: string
}> => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  const linkToDelete = await db.query.link.findFirst({
    where: eq(link.slug, slug)
  })

  if (!linkToDelete) {
    return {
      success: false,
      message: 'Link not found.'
    }
  }

  if (linkToDelete.createdBy !== session.user.id) {
    return {
      success: false,
      message: 'You do not have permission to delete this link.'
    }
  }

  await db.delete(link).where(eq(link.slug, slug))
  revalidatePath('/dashboard')

  return {
    success: true,
    message: 'Link deleted successfully.'
  }
}

export const updateLink = async (
  oldSlug: string,
  value: z.infer<typeof formSchema>
): Promise<{
  success: boolean
  message: string
}> => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  const linkToUpdate = await db.query.link.findFirst({
    where: eq(link.slug, oldSlug)
  })

  if (!linkToUpdate) {
    return {
      success: false,
      message: 'Link not found.'
    }
  }

  if (linkToUpdate.createdBy !== session.user.id) {
    return {
      success: false,
      message: 'You do not have permission to update this link.'
    }
  }

  if (oldSlug !== value.slug) {
    const slugExists = await isSlugExists(value.slug)
    if (slugExists) {
      return {
        success: false,
        message: 'Slug already exists.'
      }
    }
  }

  await db
    .update(link)
    .set({
      slug: value.slug,
      url: value.url,
      description: value.description
    })
    .where(eq(link.slug, oldSlug))

  await db.delete(linkTag).where(eq(linkTag.linkId, linkToUpdate.id))
  if (value.selectedTags && value.selectedTags.length > 0) {
    await db.insert(linkTag).values(
      value.selectedTags.map(tagId => ({
        linkId: linkToUpdate.id,
        tagId
      }))
    )
  }

  revalidatePath('/dashboard')

  return {
    success: true,
    message: 'Link updated successfully.'
  }
}
