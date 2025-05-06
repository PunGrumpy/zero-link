import type { ReactNode } from 'react'
import { Header } from './components/header'
import { Sidebar } from './components/sidebar'

type SettingsLayoutProps = {
  children: ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="col-span-full grid">
      <Header />
      <div aria-hidden="true" className="mt-12 block h-px w-px select-none" />
      <div className="container mx-auto w-full px-6">
        <div className="flex flex-initial flex-col items-stretch gap-12 sm:flex-row">
          <Sidebar />
          <div className="flex w-full flex-1 flex-col gap-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
