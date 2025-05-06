'use client'

import { getAccountByProvider } from '@/app/(app)/settings/actions/account'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { SiDiscord, SiGithub } from '@icons-pack/react-simple-icons'
import type { SocialProvider } from 'better-auth/social-providers'
import { toast } from 'sonner'

type ProviderListProps = {
  providers: { provider_id: string }[]
}

const Providers = [
  {
    id: 'github',
    name: 'GitHub',
    icon: <SiGithub color="default" className="h-6 w-6 dark:invert" />
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: <SiDiscord color="default" className="h-6 w-6" />
  }
]

export const ProviderList = ({ providers }: ProviderListProps) => {
  const handleConnect = async (providerId: string) => {
    const callbackUrl = new URL('/settings', window.location.origin)

    await authClient
      .linkSocial({
        provider: providerId as SocialProvider,
        callbackURL: callbackUrl.toString()
      })
      .then(() => {
        toast.success('Provider connected', {
          description: `You can now sign in with ${Providers.find(p => p.id === providerId)?.name}`
        })
      })
      .catch(() => {
        toast.error('Failed to connect provider', {
          description: 'You can try again by clicking the button below'
        })
      })
  }

  const handleDisconnect = async (providerId: string) => {
    const accountId = await getAccountByProvider(providerId)

    await authClient
      .unlinkAccount({
        accountId,
        providerId: providerId as SocialProvider
      })
      .then(() => {
        toast.success('Provider disconnected', {
          description: `You can now sign in with ${Providers.find(p => p.id === providerId)?.name}`
        })

        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
      .catch(() => {
        toast.error('Failed to disconnect provider', {
          description: 'You can try again by clicking the button below'
        })
      })
  }

  return (
    <Card className="p-0 shadow-none dark:bg-input/30">
      <div className="flex flex-col divide-y divide-muted">
        <ul className="m-0 list-none">
          {Providers.map(({ id, name, icon }, index) => {
            const isConnected = providers.some(p => p.provider_id === id)

            return (
              <li
                key={id}
                className={cn(
                  'flex items-center gap-3 border-border border-b p-4',
                  index === Providers.length - 1 && 'border-b-0'
                )}
              >
                <div className="space-between flex w-full items-center gap-3">
                  {icon}
                  <div className="flex flex-1 grow flex-col">
                    <h4 className="font-semibold text-sm capitalize">{name}</h4>
                    <p className="text-muted-foreground text-sm">
                      {isConnected
                        ? `Connected to ${name}`
                        : `Connect your ${name} account`}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    type="button"
                    className="ms-auto"
                    variant={isConnected ? 'destructive' : 'default'}
                    onClick={() =>
                      isConnected ? handleDisconnect(id) : handleConnect(id)
                    }
                  >
                    {isConnected ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Card>
  )
}
