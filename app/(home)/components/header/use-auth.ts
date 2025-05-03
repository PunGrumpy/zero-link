import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const router = useRouter()
  const { signOut, useSession } = authClient
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => router.push('/login')
      }
    })
  }

  return {
    session,
    handleSignOut
  }
}
