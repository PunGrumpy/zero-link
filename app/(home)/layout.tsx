import { Header } from '@/app/(home)/components/header'
import type { ReactNode } from 'react'
import { Footer } from './components/footer'

type HomeLayoutProps = {
  children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
