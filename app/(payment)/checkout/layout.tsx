import type { ReactNode } from 'react'

type CheckoutLayoutProps = {
  children: ReactNode
}

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return <>{children}</>
}
