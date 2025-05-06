import { getSessions } from '@/app/(app)/actions/session'
import { SettingCardHeader } from '@/components/setting/setting-card-header'
import { Card, CardContent } from '@/components/ui/card'
import { SessionList } from './session-list'

export const SessionsCard = async () => {
  const sessions = await getSessions()

  return (
    <Card className="w-full text-start">
      <SettingCardHeader
        title="Active Sessions"
        description="View and manage active sessions across all devices."
      />
      <CardContent className="grid gap-4">
        <SessionList sessions={sessions} />
      </CardContent>
    </Card>
  )
}
