'use client'

import { SettingCardFooter } from '@/components/setting/setting-card-footer'
import { SettingCardHeader } from '@/components/setting/setting-card-header'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import { DeleteAccountDialog } from './delete-account-dialog'

export const DeleteAccountCard = () => {
  const [open, setOpen] = useState(false)

  return (
    <Card className="w-full border border-destructive/30 pb-0 text-start">
      <SettingCardHeader
        title="Delete Account"
        description="Permanently remove your Personal Account and all of its contents from the Vercel platform. This action is not reversible, so please continue with caution."
        className="pb-4"
      />
      <SettingCardFooter
        actionLabel="Delete Personal Account"
        variant="destructive"
        action={() => {
          setOpen(true)
        }}
      />
      <DeleteAccountDialog open={open} onOpenChange={setOpen} />
    </Card>
  )
}
