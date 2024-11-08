'use client'

import { ViewportProvider } from '@/context/ViewportContext';
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function RootProviders({ children }: { children: React.ReactNode }) {

  const router = useRouter();

  return (
    <NextUIProvider className="h-full" navigate={router.push}>
      <ViewportProvider>
        {children}
      </ViewportProvider>
    </NextUIProvider>
  )
}