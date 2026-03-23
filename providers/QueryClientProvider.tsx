'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// BUG 11 FIX: Create QueryClient inside the component via useState to prevent
// cross-request data leaks in production (module-level singletons are shared
// across requests in server environments).
export default function QueryClientProviderMain({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}