import { auth } from '@/lib/auth'
import { createMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { DeleteAccountCard } from './components/delete-account-card'
import { UpdateAvatarCard } from './components/update-avatar-card'
import { UpdateNameCard } from './components/update-name-card'

const title = 'Settings - Zero Link'
const description = 'Settings for Zero Link'

export const metadata: Metadata = createMetadata(title, description)

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <UpdateAvatarCard session={session} />
      <UpdateNameCard session={session} />
      <DeleteAccountCard />
    </>
  )
}
