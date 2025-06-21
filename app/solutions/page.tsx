'use client'

import dynamic from 'next/dynamic'
import Loading from '@/components/Loading'
import CustomErrorBoundary from '@/components/ErrorBoundary'

// Import HolographicGallery with no SSR
const HolographicGallery = dynamic(() => import('@/components/HolographicGallery'), {
  ssr: false,
  loading: () => <Loading />
})

export default function SolutionsPage() {
  return (
    <CustomErrorBoundary>
      <HolographicGallery />
    </CustomErrorBoundary>
  )
} 