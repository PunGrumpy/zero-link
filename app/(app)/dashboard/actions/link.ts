'use server'

import { db } from '@/db'
import { link, linkTag, tag } from '@/db/schema'
import { auth } from '@/lib/auth'
import { count, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { z } from 'zod'
import type { formSchema } from '../components/create-link'

export type LinkWithTag = typeof link.$inferSelect & {
  tags: (typeof tag.$inferSelect)[]
}

export const getLinkandTagByUser = async (): Promise<{
  links: LinkWithTag[]
  tags: (typeof tag.$inferSelect)[]
  limit: number
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

  const tags = await db
    .select()
    .from(tag)
    .where(eq(tag.createdBy, session.user.id))

  return {
    links,
    tags,
    limit: session.user.limitLinks
  }
}

export const isSlugExists = async (slug: string): Promise<boolean> => {
  const result = await db
    .select()
    .from(link)
    .where(eq(link.slug, slug))
    .limit(1)

  return result.length > 0
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
  const limitLink = session.user.limitLinks

  if (countLink[0].count >= limitLink) {
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
