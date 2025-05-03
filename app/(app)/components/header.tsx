'use client'

import { AuthButton } from '@/components/auth/auth-button'
import { MobileMenuTrigger } from '@/components/auth/mobile-menu-trigger'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import type { auth } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { Bell } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type HeaderProps = {
  session: typeof auth.$Infer.Session
}

export const Header = ({ session }: HeaderProps) => {
  return (
    <header
      className={cn(
        'flex min-h-16 items-center bg-background px-4 md:px-6',
        '[&>*:not(a)]:h-header [&_a]:no-underline [&_a]:transition-colors [&_a]:duration-200 [&_a]:ease-[easing-function:ease] [&_button]:transition-colors [&_button]:duration-200 [&_button]:ease-[easing-function:ease] [&_ul]:m-0 [&_ul]:list-none [&_ul]:p-0'
      )}
    >
      <Link
        href="/"
        className={cn(
          'flex items-center space-x-2',
          '[&:has(~nav>ul>li)]:hidden md:[&:has(~nav>ul>li)]:inline'
        )}
      >
        <div
          className={cn(
            'relative h-6 w-6 overflow-hidden transition-all duration-300 ease-in-out'
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Zeus Logo"
              width={24}
              height={24}
              className="invert dark:invert-0"
            />
          </div>
        </div>
      </Link>
      <nav className="flex flex-1 flex-row items-center justify-between gap-6 sm:pl-4">
        <ul className="flex flex-initial flex-row items-center">
          <li className="flex flex-initial flex-row items-center gap-0.5 sm:gap-2">
            <svg
              width="16"
              height="16"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
              className="hidden sm:block"
              style={{
                width: '22px',
                height: '22px',
                color: 'var(--muted)'
              }}
            >
              <title>Slash</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.01526 15.3939L4.3107 14.7046L10.3107 0.704556L10.6061 0.0151978L11.9849 0.606077L11.6894 1.29544L5.68942 15.2954L5.39398 15.9848L4.01526 15.3939Z"
                fill="currentColor"
              />
            </svg>
            <Link
              href="/dashboard"
              className="flex flex-initial flex-row items-center gap-2"
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={session?.user?.image || ''} />
                <AvatarFallback>
                  {session?.user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className="font-medium text-sm">{session?.user?.name}</p>
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex">
            <Button asChild variant="outline">
              <Link href="/feedback">Feedback</Link>
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full md:h-9 md:w-9"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <AuthButton session={session} />

          <div className="flex justify-end md:hidden">
            <MobileMenuTrigger />
          </div>
        </div>
      </nav>
    </header>
  )
}
