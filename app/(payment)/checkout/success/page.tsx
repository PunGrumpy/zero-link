import { CheckoutSuccess } from './components/checkout-success'

type CheckoutSuccessPageProps = {
  searchParams: Promise<{
    redirectPath: string
  }>
}

export default async function CheckoutSuccessPage({
  searchParams
}: CheckoutSuccessPageProps) {
  const { redirectPath } = await searchParams

  return <CheckoutSuccess redirectPath={redirectPath} />
}
