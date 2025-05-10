'use client'

import { SettingCardFooter } from '@/components/setting/setting-card-footer'
import { SettingCardHeader } from '@/components/setting/setting-card-header'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export const CustomerCard = () => {
  const router = useRouter()

  return (
    <Card className="w-full pb-0 text-start">
      <SettingCardHeader
        title="Customer Portal"
        description="Manage your subscription and billing information."
      />
      <SettingCardFooter
        actionLabel="Manage Subscription"
        action={() => {
          router.push('/api/auth/portal')
        }}
      />
    </Card>
  )
}
