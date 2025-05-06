'use server'

import { db } from '@/db'
import { link } from '@/db/schema'
import { eq } from 'drizzle-orm'

type UrlFromSlugResponse = {
  success: boolean
  message: string
  url: string
}

export const urlFromSlug = async (
  slug: string
): Promise<UrlFromSlugResponse> => {
  if (!slug) {
    return {
      success: false,
      message: 'Slug is required',
      url: ''
    }
  }

  const linkData = await db.query.link.findFirst({
    where: eq(link.slug, slug)
  })

  if (!linkData) {
    return {
      success: false,
      message: 'Link not found',
      url: ''
    }
  }

  await db
    .update(link)
    .set({
      clicks: linkData.clicks + 1,
      lastClicked: new Date()
    })
    .where(eq(link.id, linkData.id))

  return {
    success: true,
    message: 'Link found',
    url: linkData.url
  }
}
