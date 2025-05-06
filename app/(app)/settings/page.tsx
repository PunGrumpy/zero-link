import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { DeleteAccountCard } from './components/delete-account-card'
import { UpdateAvatarCard } from './components/update-avatar-card'
import { UpdateNameCard } from './components/update-name-card'

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
