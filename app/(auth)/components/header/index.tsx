'use client'

import { Button } from '@/components/ui/button'
import { useIsScroll } from '@/hooks/use-scroll'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  const isScroll = useIsScroll()

  return (
    <header className="container mx-auto flex h-full min-h-16 px-6">
      <Link
        href="/"
        className={cn(
          'flex items-center space-x-2',
          isScroll && 'fixed top-4 z-10'
        )}
      >
        <div
          className={cn(
            'relative overflow-hidden transition-all duration-300 ease-in-out',
            isScroll ? 'h-6 w-6' : 'h-8 w-8'
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Zeus Logo"
              width={32}
              height={32}
              className="h-8 w-8 invert dark:invert-0"
            />
          </div>
        </div>
      </Link>
      <nav className="flex flex-1 flex-row items-center justify-end">
        <div className="flex flex-initial flex-row items-center justify-end gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
