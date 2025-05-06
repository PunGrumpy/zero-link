'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { authClient } from '@/lib/auth-client'
import type { Session } from 'better-auth'
import { formatDistanceToNow } from 'date-fns'
import { Laptop, LogOut, Smartphone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { UAParser } from 'ua-parser-js'

type SessionListProps = {
  sessions: Session[]
}

export const SessionList = ({ sessions }: SessionListProps) => {
  const router = useRouter()
  const { useSession } = authClient
  const { data: sessionData } = useSession()

  return (
    <div className="grid gap-4">
      {sessions.map(session => {
        const isCurrentSession = session.id === sessionData?.session?.id

        const handleRevokeSession = async () => {
          if (isCurrentSession) {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.refresh()
                }
              }
            })
            return
          }

          await authClient.revokeSession({
            token: session.token
          })

          toast.success('Session revoked', {
            icon: <LogOut className="h-4 w-4" />,
            description: 'You can now sign in again'
          })
        }

        const parser = new UAParser(session.userAgent || '')
        const isMobile = parser.getDevice().type === 'mobile'
        const lastActive = formatDistanceToNow(new Date(session.updatedAt), {
          addSuffix: true
        })

        return (
          <Card
            key={session.id}
            className="flex-row items-center gap-3 bg-input/30 p-4 shadow-none"
          >
            {isMobile ? (
              <Smartphone className="h-6 w-6 " />
            ) : (
              <Laptop className="h-6 w-6 " />
            )}

            <div className="flex flex-col gap-0.5">
              <p className="font-semibold text-sm">
                {isCurrentSession ? 'Current Session' : session.ipAddress}
              </p>

              <p className="text-muted-foreground text-xs">
                {parser.getBrowser().name} on {parser.getOS().name}
              </p>
            </div>

            <p className="ms-auto me-4 text-muted-foreground text-xs">
              Last active {lastActive}
            </p>

            <Button
              variant={isCurrentSession ? 'destructive' : 'outline'}
              size="sm"
              className="relative"
              onClick={handleRevokeSession}
            >
              {isCurrentSession ? 'Sign Out' : 'Revoke'}
            </Button>
          </Card>
        )
      })}
    </div>
  )
}
