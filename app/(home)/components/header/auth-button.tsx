'use client'

import { ThemeSwitcher } from '@/components/theme-switcher'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { LogOutIcon } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from './use-auth'

export const AuthButton = () => {
  const { session, handleSignOut } = useAuth()

  if (!session) {
    return (
      <>
        <Button asChild size="sm" variant="outline" className="w-full md:w-fit">
          <Link href="/contact">Contact Us</Link>
        </Button>
        <Button asChild size="sm" className="w-full md:w-fit">
          <Link href="/login">Login</Link>
        </Button>
      </>
    )
  }

  return (
    <>
      <Button variant="outline" asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage
              src={session.user.image || ''}
              alt={session.user.name || 'User Avatar'}
            />
            <AvatarFallback>
              {session.user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="mt-2 w-64 overflow-visible p-1 py-2"
          align="end"
        >
          <DropdownMenuLabel className="flex flex-col gap-1 px-2 py-2">
            {session?.user?.name || 'User Name'}
            <p className="text-muted-foreground">
              {session?.user?.email || 'example@blackhead.com'}
            </p>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild className="py-2.5 text-muted-foreground">
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="py-2.5 text-muted-foreground">
            <Link href="/settings" className="cursor-pointer">
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="flex items-center justify-between text-muted-foreground">
            Theme
            <ThemeSwitcher />
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="group my-1.5 cursor-pointer py-2.5 text-muted-foreground"
            onClick={handleSignOut}
          >
            Logout
            <DropdownMenuShortcut>
              <LogOutIcon className="h-4 w-4 group-hover:text-accent-foreground" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
