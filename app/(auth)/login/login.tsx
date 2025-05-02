'use client'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { DiscordLogo, GithubLogo } from '@phosphor-icons/react'

export const LogIn = () => {
  return (
    <div className="relative flex h-full min-h-[calc(100vh-64px)] w-full shrink grow flex-col content-center items-center justify-center gap-6 p-6">
      <div className="mx-auto mb-4 max-w-md text-center">
        <h1 className="font-semibold text-3xl">Log in to Zeus</h1>
      </div>
      <div className="mx-auto w-full max-w-80">
        <div className="flex flex-col gap-3">
          <Button
            variant="secondary"
            className="h-12 gap-1.5"
            onClick={async () =>
              await authClient.signIn.social({
                provider: 'github'
              })
            }
          >
            <GithubLogo className="size-6" />
            Continue with GitHub
          </Button>

          <Button
            className="h-12 gap-1.5 bg-blue-600 text-primary hover:bg-blue-700"
            onClick={async () =>
              await authClient.signIn.social({
                provider: 'discord'
              })
            }
          >
            <DiscordLogo className="size-6" />
            Continue with Discord
          </Button>
        </div>
      </div>
    </div>
  )
}
