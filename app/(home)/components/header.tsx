'use client'

import { AuthButton } from '@/components/menu/auth-button'
import { MobileMenuTrigger } from '@/components/menu/mobile-menu-trigger'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { useIsScroll } from '@/hooks/use-scroll'
import type { auth } from '@/lib/auth'
import { navigation } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

type HeaderProps = {
  session: typeof auth.$Infer.Session | null
}

export const Header = ({ session }: HeaderProps) => {
  const isScrolled = useIsScroll()

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full bg-background backdrop-blur-md transition-all duration-300',
        isScrolled && 'border-border border-b'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Zero Link Logo"
                  width={32}
                  height={32}
                  className="invert dark:invert-0"
                />
              </div>
            </div>
            <span className="font-bold text-xl">Zero Link</span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navigation.map(item => (
                <NavigationMenuItem
                  key={item.label}
                  className="hidden text-muted-foreground md:block"
                >
                  {item.href ? (
                    <NavigationMenuLink asChild>
                      <Button
                        asChild
                        size="sm"
                        variant="ghost"
                        className="rounded-full"
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </Button>
                    </NavigationMenuLink>
                  ) : (
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="hidden items-center justify-end gap-3 md:flex">
          {session ? (
            <AuthButton session={session}>
              <Button asChild variant="outline">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </AuthButton>
          ) : (
            <>
              <Button asChild variant="outline" className="w-full md:w-fit">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild className="w-full md:w-fit">
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}
        </div>
        <div className="flex justify-end md:hidden">
          <MobileMenuTrigger />
        </div>
      </div>
    </header>
  )
}
