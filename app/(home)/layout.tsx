import { Header } from '@/app/(home)/components/header'
import type { ReactNode } from 'react'

type HomeLayoutProps = {
  children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
