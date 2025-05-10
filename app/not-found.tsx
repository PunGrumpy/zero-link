import { MobileMenu } from '@/components/menu/mobile-menu'
import { Prose } from '@/components/prose'
import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { headers } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { Footer } from './(home)/components/footer'
import { Header } from './(home)/components/header'

export default async function NotFound() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <>
      <Header session={session} />
      <MobileMenu session={session} />
      <div className="h-32" />
      <main className="relative mx-auto max-w-6xl divide-y">
        <Section crossPosition="both" className="border-y border-dashed py-24">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/logo.svg"
              alt="Zero Link Logo"
              width={80}
              height={80}
            />
            <h1
              className={cn(
                'max-w-4xl font-bold text-3xl leading-tight tracking-tight',
                'text-center text-5xl leading-tight',
                'md:text-7xl md:leading-tight'
              )}
            >
              404
            </h1>
          </div>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Prose className="text-center text-muted-foreground">
              The page you are looking for does not exist.
            </Prose>
            <Button asChild size="lg" className="rounded-full text-base">
              <Link href="/">Go to home</Link>
            </Button>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
