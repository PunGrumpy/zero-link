import { ThemeSwitcher } from '@/components/theme-switcher'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Layout, Settings } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from './use-auth'

export const MobileAuthButton = () => {
  const { session, handleSignOut } = useAuth()

  if (!session) {
    return (
      <>
        <Button asChild size="lg" variant="outline" className="w-full md:w-fit">
          <Link href="/contact">Contact Us</Link>
        </Button>
        <Button asChild size="lg" className="w-full md:w-fit">
          <Link href="/login">Login</Link>
        </Button>
      </>
    )
  }

  return (
    <>
      <Button variant="outline" size="lg" className="w-full" asChild>
        <Link href="/contact">Contact Us</Link>
      </Button>

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

          <div className="flex items-center justify-between px-3 py-2 text-muted-foreground">
            Theme
            <ThemeSwitcher />
          </div>

          <div className="flex items-center justify-between p-3 text-muted-foreground">
            <button type="button" onClick={handleSignOut}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
