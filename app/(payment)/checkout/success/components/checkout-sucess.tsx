'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

type CheckoutSuccessProps = {
  redirectPath: string
}

export const CheckoutSuccess = ({ redirectPath }: CheckoutSuccessProps) => {
  const router = useRouter()
  const hasRunned = useRef(false)

  useEffect(() => {
    if (redirectPath && !hasRunned.current) {
      router.replace(redirectPath)
      hasRunned.current = true
    }
  }, [redirectPath, router])

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-center text-sm">
      <Image
        src="/logo.svg"
        alt="Zero Link Logo"
        width={80}
        height={80}
        className="mb-6"
      />
      <div className="flex flex-col items-center justify-center">
        <p>Checkout successful</p>
        <p className="inline-block">
          If Zero Link dosen't open in a few seconds,{' '}
          <Link href={redirectPath} className="underline">
            click here
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
