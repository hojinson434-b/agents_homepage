// 메인 페이지 — 히어로 배너 + 인기 상품 + 신상품 + 브랜드 스토리 + 리뷰

import HeroBanner from '@/components/home/HeroBanner'
import PopularProducts from '@/components/home/PopularProducts'
import NewArrivals from '@/components/home/NewArrivals'
import BrandStory from '@/components/home/BrandStory'
import ReviewPreview from '@/components/home/ReviewPreview'

export default function Home() {
  return (
    <div className="bg-cream">
      <HeroBanner />
      <PopularProducts />
      <NewArrivals />
      <BrandStory />
      <ReviewPreview />
    </div>
  )
}
