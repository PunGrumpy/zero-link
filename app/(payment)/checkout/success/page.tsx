import { CheckoutSuccess } from './components/checkout-sucess'

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
