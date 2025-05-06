'use server'

import { db } from '@/db'
import { account } from '@/db/schema'
import { auth } from '@/lib/auth'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const getAccountByProvider = async (providerId?: string) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  const accountData = await db.query.account.findFirst({
    where: providerId
      ? and(
          eq(account.userId, session.user.id),
          eq(account.providerId, providerId)
        )
      : eq(account.userId, session.user.id)
  })

  return accountData?.accountId
}

export const getAccounts = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  const accountData = await db.query.account.findMany({
    where: eq(account.userId, session.user.id)
  })

  return accountData
}
