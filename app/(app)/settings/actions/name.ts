'use server'

import { db } from '@/db'
import { user } from '@/db/schema'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const updateName = async (
  name: string
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

  const userData = await db.query.user.findFirst({
    where: eq(user.id, session.user.id)
  })

  const newName = name.trim()

  if (newName === userData?.name) {
    return {
      success: false,
      message: 'Name is the same as the current name'
    }
  }

  await db
    .update(user)
    .set({
      name: newName
    })
    .where(eq(user.id, session.user.id))

  return {
    success: true,
    message: 'Name updated successfully'
  }
}
