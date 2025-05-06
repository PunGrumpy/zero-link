'use client'

import { appNavigation } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export const Navigation = () => {
  const pathname = usePathname()
  const [activePosition, setActivePosition] = useState({ left: 0, width: 0 })
  const itemsRef = useRef<{ [key: string]: HTMLAnchorElement }>({})

  useEffect(() => {
    const activeItem = Object.values(itemsRef.current).find(item => {
      const href = item.getAttribute('href')
      return href && pathname.startsWith(href)
    })
    if (activeItem) {
      const { left, width } = activeItem.getBoundingClientRect()
      setActivePosition({ left, width })
    }
  }, [pathname])

  return (
    <div
      className={cn(
        'flex-initial flex-row items-center justify-start',
        'scrollbar-none -mt-2.5 sticky top-0 overflow-x-auto',
        'z-[calc(50_-_1)] bg-background shadow-[inset_0_-1px] shadow-muted'
      )}
    >
      <div className="relative flex transform-none items-center px-4 md:px-6 [&>*]:shrink-0">
        {appNavigation.map(item => {
          const isActive = pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              ref={el => {
                if (el) {
                  itemsRef.current[item.href] = el
                }
              }}
              href={item.href}
              className={cn(
                'relative inline-block select-none px-3 py-4 no-underline outline-offset-[-6px]! transition-colors duration-200 ease-[easing-function:ease]',
                'group outline-none',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground transition-colors hover:text-foreground'
              )}
            >
              <div className="-z-10 absolute inset-x-0 top-2.5 h-8 rounded-sm bg-muted opacity-0 transition-opacity duration-200 contain-strict group-hover:opacity-100" />
              {item.label}
            </Link>
          )
        })}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-foreground transition-all duration-300 ease-in-out"
          style={{
            left: `${activePosition.left}px`,
            width: `${activePosition.width}px`
          }}
        />
      </div>
    </div>
  )
}
