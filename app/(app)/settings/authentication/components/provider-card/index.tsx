import { getProviders } from '@/app/(app)/actions/provider'
import { SettingCardHeader } from '@/components/setting/setting-card-header'
import { Card, CardContent } from '@/components/ui/card'
import { ProviderList } from './provider-list'

export const ProviderCard = async () => {
  const providers = await getProviders()

  return (
    <Card className="w-full text-start">
      <SettingCardHeader
        title="Sign-in Method"
        description="Customize how you access your account. Link your OAuth profiles, secure authentication."
      />
      <CardContent className="grid gap-4">
        <ProviderList providers={providers} />
      </CardContent>
    </Card>
  )
}
