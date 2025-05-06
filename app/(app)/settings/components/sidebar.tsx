'use client'

import { Button } from '@/components/ui/button'
import { settingsNavigation } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className="hidden lg:block">
      <div className="sticky top-16 md:w-3xs">
        {settingsNavigation.map(item => (
          <div key={item.href} className="flex items-center py-0.5">
            <Button
              asChild
              variant="ghost"
              className={cn(
                'w-full justify-start font-normal',
                pathname !== item.href && 'text-muted-foreground'
              )}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
