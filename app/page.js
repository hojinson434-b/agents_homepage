// 메인 페이지 — 히어로 배너 + 인기 상품 + 신상품 + 브랜드 스토리 + 리뷰
// 하단 섹션은 dynamic import로 초기 로딩 최적화

import dynamic from 'next/dynamic'
import HeroBanner from '@/components/home/HeroBanner'
import PopularProducts from '@/components/home/PopularProducts'
import NewArrivals from '@/components/home/NewArrivals'

// 스크롤 아래 섹션은 lazy load
const BrandStory = dynamic(() => import('@/components/home/BrandStory'))
const ReviewPreview = dynamic(() => import('@/components/home/ReviewPreview'))

export default function Home() {
  return (
    <div className="bg-cream dark:bg-dm-bg">
      <HeroBanner />
      <PopularProducts />
      <NewArrivals />
      <BrandStory />
      <ReviewPreview />
    </div>
  )
}
