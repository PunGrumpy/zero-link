import { createMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { ProviderCard } from './components/provider-card'

const title = 'Authentication - Zero Link'
const description = 'Authentication settings for Zero Link'

export const metadata: Metadata = createMetadata(title, description)

export default function AuthenticationPage() {
  return (
    <>
      <ProviderCard />
    </>
  )
}
