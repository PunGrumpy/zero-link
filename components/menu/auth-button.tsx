'use client'

import type { auth } from '@/lib/auth'
import { authClient } from '@/lib/auth-client'
import { LogOutIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { ThemeSwitcher } from '../theme-switcher'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

type AuthButtonProps = {
  children?: ReactNode
  session: typeof auth.$Infer.Session
}

export const AuthButton = ({ children, session }: AuthButtonProps) => {
  const { signOut } = authClient
  const router = useRouter()

  return (
    <div className="hidden items-center justify-end gap-3 md:flex">
      {children}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage
              src={session?.user.image || ''}
              alt={session?.user.name || 'User Avatar'}
            />
            <AvatarFallback>
              {session?.user.name?.charAt(0).toUpperCase()}
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
              {session?.user?.email || 'zero@zerolink.dev'}
            </p>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild className="py-2.5 text-muted-foreground">
            <Link href="/dashboard" className="cursor-pointer">
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="py-2.5 text-muted-foreground">
            <Link href="/settings" className="cursor-pointer">
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="flex items-center justify-between font-normal">
            <p className="text-muted-foreground">Theme</p>
            <ThemeSwitcher />
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="group my-1.5 cursor-pointer py-2.5 text-muted-foreground"
            onClick={() =>
              signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.refresh()
                  }
                }
              })
            }
          >
            Logout
            <DropdownMenuShortcut>
              <LogOutIcon className="h-4 w-4 group-hover:text-accent-foreground" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
