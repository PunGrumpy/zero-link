'use server'

import { db } from '@/db'
import { session } from '@/db/schema'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const getSessions = async () => {
  const sessionData = await auth.api.getSession({
    headers: await headers()
  })

  if (!sessionData) {
    redirect('/login')
  }

  const sessions = await db
    .select()
    .from(session)
    .where(eq(session.userId, sessionData.session.userId))

  return sessions
}
