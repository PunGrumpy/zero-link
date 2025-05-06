import { Header } from '@/app/(home)/components/header'
import { MobileMenu } from '@/components/menu/mobile-menu'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import type { ReactNode } from 'react'
import { Footer } from './components/footer'

type HomeLayoutProps = {
  children: ReactNode
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <>
      <Header session={session} />
      <MobileMenu session={session} />
      {children}
      <Footer />
    </>
  )
}
