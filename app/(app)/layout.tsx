import { Footer } from '@/components/footer'
import { MobileMenu } from '@/components/menu/mobile-menu'
import { auth } from '@/lib/auth'
import { getPlanByProductId } from '@/lib/plans'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { Header } from './components/header'
import { Navigation } from './components/navigation'

type AppLayoutProps = {
  children: ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const { activeSubscriptions } = await auth.api.polarCustomerState({
    headers: await headers()
  })
  const plan =
    activeSubscriptions.length > 0
      ? getPlanByProductId(activeSubscriptions[0].productId)
      : 'starter'

  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <Header session={session} plan={plan} />
      <MobileMenu session={session} />
      <main className="min-h-[calc(100vh+64px)] text-sm [&:has([data-not-found])]:bg-background">
        <Navigation />
        {children}
      </main>
      <Footer />
    </>
  )
}
