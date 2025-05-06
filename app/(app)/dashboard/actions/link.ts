'use server'

import { db } from '@/db'
import { link, linkTag, tag } from '@/db/schema'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { z } from 'zod'
import type { formSchema } from '../components/create-link'

export type LinkWithTag = typeof link.$inferSelect & {
  tags: (typeof tag.$inferSelect)[]
}

type LinkWithRelations = typeof link.$inferSelect & {
  tags: Array<{
    tag: typeof tag.$inferSelect
  }>
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

  const results = (await db.query.link.findMany({
    where: eq(link.createdBy, session.user.id),
    with: {
      tags: {
        with: {
          tag: true
        }
      }
    }
  })) as LinkWithRelations[]

  const links = results.map(result => ({
    ...result,
    tags: result.tags.map(t => t.tag)
  }))

  const tags = await db.query.tag.findMany({
    where: eq(tag.createdBy, session.user.id)
  })

  return {
    links,
    tags,
    limit: session.user.limitLinks
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

  const countLink = await db.query.link.findMany({
    where: eq(link.createdBy, session.user.id)
  })
  const limitLink = session.user.limitLinks

  if (countLink.length >= limitLink) {
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
