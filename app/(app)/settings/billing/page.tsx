import { createMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { CustomerCard } from './components/customer-card'

const title = 'Billing - Zero Link'
const description = 'Billing settings for Zero Link'

export const metadata: Metadata = createMetadata(title, description)

export default function BillingPage() {
  return <CustomerCard />
}
