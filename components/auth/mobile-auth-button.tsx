'use client'

import type { auth } from '@/lib/auth'
import { authClient } from '@/lib/auth-client'
import { Layout, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { ThemeSwitcher } from '../theme-switcher'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type MobileAuthButtonProps = {
  children: ReactNode
  session: typeof auth.$Infer.Session
}

export const MobileAuthButton = ({
  children,
  session
}: MobileAuthButtonProps) => {
  const { signOut } = authClient
  const router = useRouter()

  return (
    <>
      {children}
      <div className="space-y-1">
        <div className="border-b py-1 pb-4">
          <div className="flex items-center justify-between p-3">
            {session?.user?.email}
            <Avatar className="h-4 w-4">
              <AvatarImage
                src={session.user.image || ''}
                alt={session.user.name || 'User Avatar'}
              />
              <AvatarFallback>
                {session.user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex items-center justify-between p-3">
            <Link href="/dashboard">Dashboard</Link>
            <Layout className="h-4 w-4" />
          </div>

          <div className="flex items-center justify-between p-3">
            <Link href="/settings">Settings</Link>
            <Settings className="h-4 w-4" />
          </div>

          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-muted-foreground">Theme</p>
            <ThemeSwitcher />
          </div>

          <div className="flex items-center justify-between p-3 text-muted-foreground">
            <button
              type="button"
              onClick={() =>
                signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push('/')
                    }
                  }
                })
              }
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
