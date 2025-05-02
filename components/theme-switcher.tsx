'use client'

import { cn } from '@/lib/utils'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const themes = [
    {
      key: 'system',
      icon: Monitor,
      label: 'System theme'
    },
    {
      key: 'light',
      icon: Sun,
      label: 'Light theme'
    },
    {
      key: 'dark',
      icon: Moon,
      label: 'Dark theme'
    }
  ]

  return (
    <div className="relative flex h-8 rounded-full bg-background p-1 ring-1 ring-border">
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key

        return (
          <button
            type="button"
            key={key}
            className="relative h-6 w-6 rounded-full"
            onClick={() => setTheme(key)}
            aria-label={label}
          >
            {isActive && (
              <div
                id="theme-switcher-indicator"
                className="absolute inset-0 rounded-full bg-muted/50 ring-1 ring-border"
              />
            )}
            <Icon
              className={cn(
                'relative m-auto h-4 w-4',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )}
            />
            <span className="sr-only">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
