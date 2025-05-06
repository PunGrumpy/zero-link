'use server'

import { db } from '@/db'
import { account } from '@/db/schema'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const getProviders = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  const providers = await db
    .select({
      provider_id: account.providerId
    })
    .from(account)
    .where(eq(account.userId, session.user.id))

  return providers
}
