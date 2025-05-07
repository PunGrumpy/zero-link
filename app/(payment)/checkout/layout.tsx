import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

type CheckoutLayoutProps = {
  children: ReactNode
}

export default async function CheckoutLayout({
  children
}: CheckoutLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  return <>{children}</>
}
