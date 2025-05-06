import type { ReactNode } from 'react'

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="container relative grid auto-rows-fr md:mx-auto">
      <section className="col-span-full grid-rows-2">
        <section className="px-4 py-6 md:px-6">
          <div className="flex flex-initial flex-col items-stretch gap-4 sm:gap-6">
            {children}
          </div>
        </section>
      </section>
    </div>
  )
}
