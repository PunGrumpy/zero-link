import { createMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const LogIn = dynamic(() => import('./login').then(mod => mod.LogIn))

const title = 'Login - Zero Link'
const description = 'Login to your Zero Link account'

export const metadata: Metadata = createMetadata(title, description)

export default function LogInPage() {
  return <LogIn />
}
