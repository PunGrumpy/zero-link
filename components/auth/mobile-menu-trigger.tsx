'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { mobileMenuOpen } from './mobile-menu'

export const MobileMenuTrigger = () => {
  const { isOpen, toggle } = mobileMenuOpen()

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-8 w-8 shrink-0 rounded-full lg:hidden"
      onClick={toggle}
      aria-label="Open main menu"
      data-expanded={isOpen}
    >
      <span className="sr-only">Open main menu</span>
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            'absolute h-px w-3 bg-foreground transition-all duration-300',
            isOpen ? 'rotate-45' : '-translate-y-[3px]'
          )}
          data-position="top"
        />
        <div
          className={cn(
            'absolute h-px w-3 bg-foreground transition-all duration-300',
            isOpen ? '-rotate-45' : 'translate-y-[3px]'
          )}
          data-position="bottom"
        />
      </div>
    </Button>
  )
}
