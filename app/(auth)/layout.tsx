import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { Footer } from './components/footer'
import { Header } from './components/header'

type AuthLayoutProps = {
  children: ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session) {
    return redirect('/dashboard')
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
