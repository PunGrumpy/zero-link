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

  const accountData = await db
    .select({
      account_id: account.accountId
    })
    .from(account)
    .where(
      providerId
        ? and(
            eq(account.userId, session.user.id),
            eq(account.providerId, providerId)
          )
        : eq(account.userId, session.user.id)
    )

  return accountData[0]?.account_id
}

export const getAccounts = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  const accountData = await db
    .select()
    .from(account)
    .where(eq(account.userId, session.user.id))

  return accountData
}
