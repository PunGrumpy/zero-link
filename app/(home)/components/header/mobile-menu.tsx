'use client'

import { ThemeSwitcher } from '@/components/theme-switcher'
import { navigation } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { create } from 'zustand'
import { MobileAuthButton } from './mobile-auth-button'

export const mobileMenuOpen = create<{
  isOpen: boolean
  toggle: () => void
}>(set => ({
  isOpen: false,
  toggle: () => set(state => ({ isOpen: !state.isOpen }))
}))

export const MobileMenu = () => {
  const pathname = usePathname()
  const { isOpen, toggle } = mobileMenuOpen()

  return (
    <div
      className={cn(
        'fixed top-[53px] right-0 left-0 z-50 flex h-[calc(100vh-53px)] flex-col gap-4 bg-background px-6 pt-6',
        'sm:top-[69px] sm:h-[calc(100vh-69px)]',
        isOpen ? 'flex md:hidden' : 'hidden'
      )}
    >
      <div className="flex w-full flex-col space-y-4">
        <MobileAuthButton />
      </div>

      <div className="space-y-2.5 border-b py-2 pb-4">
        {navigation.map((link, index) => (
          <div key={index} className="py-1">
            <Link
              key={link.href}
              href={link.href}
              onClick={toggle}
              className={cn(
                'flex items-center gap-2.5 px-3 font-medium text-muted-foreground',
                pathname === link.href && 'text-foreground'
              )}
            >
              {link.label}
            </Link>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-b px-3 pb-4">
        <p className="text-muted-foreground">Theme</p>
        <ThemeSwitcher />
      </div>
    </div>
  )
}
