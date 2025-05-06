import { createMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { SessionsCard } from './components/sessions-card'

const title = 'Security - Zero Link'
const description = 'Security settings for Zero Link'

export const metadata: Metadata = createMetadata(title, description)

export default function SecurityPage() {
  return (
    <>
      <SessionsCard />
    </>
  )
}
