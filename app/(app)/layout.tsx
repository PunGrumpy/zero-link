import { MobileMenu } from '@/components/auth/mobile-menu'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { Header } from './components/header'

type AppLayoutProps = {
  children: ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <Header session={session} />
      <MobileMenu session={session} />
      <main className="flex-1">{children}</main>
    </>
  )
}
