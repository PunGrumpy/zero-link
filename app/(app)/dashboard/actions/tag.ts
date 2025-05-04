'use server'

import { db } from '@/db'
import { tag } from '@/db/schema'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { z } from 'zod'
import type { formSchema } from '../components/create-tag'

export const createTag = async (
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

  const result = await db.insert(tag).values({
    name: value.name,
    color: value.color,
    createdBy: session.user.id
  })

  if (!result) {
    return {
      success: false,
      message: 'Unable to create tag, please try again!'
    }
  }

  revalidatePath('/dashboard')

  return {
    success: true,
    message: 'Tag created successfully'
  }
}
