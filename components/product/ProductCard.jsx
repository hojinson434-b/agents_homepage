// 상품 카드 컴포넌트 — 상품 목록, 인기 상품 등에서 재사용
// 이미지, 배지, 이름, 설명, 가격, 별점 표시

import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

// 배지 텍스트에 따른 variant 매핑
const badgeVariantMap = {
  BEST: 'best',
  NEW: 'new',
  SALE: 'sale',
}

export default function ProductCard({ product }) {
  const { id, name, description, price, salePrice, badge, rating, reviewCount } = product

  // 할인율 계산
  const discountRate = salePrice
    ? Math.round(((price - salePrice) / price) * 100)
    : 0

  return (
    <Link href={`/products/${id}`}>
      <div className="bg-white rounded-card shadow-warm-sm overflow-hidden hover:shadow-warm-hover hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        {/* 이미지 영역 */}
        <div className="bg-cream-dark h-48 lg:h-56 flex items-center justify-center relative">
          <span className="font-body text-caption text-neutral-300">600 x 450</span>

          {/* 배지 */}
          {badge && (
            <div className="absolute top-3 left-3">
              <Badge variant={badgeVariantMap[badge] || 'default'}>
                {badge}
              </Badge>
            </div>
          )}

          {/* 할인율 */}
          {discountRate > 0 && (
            <div className="absolute top-3 right-3">
              <span className="bg-error text-white font-accent text-small font-medium px-2 py-1 rounded-button">
                -{discountRate}%
              </span>
            </div>
          )}
        </div>

        {/* 상품 정보 */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-display text-heading-3 text-chocolate mb-1 truncate">
            {name}
          </h3>
          <p className="font-body text-caption text-neutral-400 mb-3 line-clamp-1">
            {description}
          </p>

          {/* 가격 */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2">
              {salePrice ? (
                <>
                  <span className="font-accent text-body font-medium text-gold">
                    {formatPrice(salePrice)}원
                  </span>
                  <span className="font-body text-small text-neutral-300 line-through">
                    {formatPrice(price)}원
                  </span>
                </>
              ) : (
                <span className="font-accent text-body font-medium text-gold">
                  {formatPrice(price)}원
                </span>
              )}
            </div>

            {/* 별점 + 리뷰 수 */}
            <div className="flex items-center gap-1 mt-2">
              <span className="text-gold text-caption">★</span>
              <span className="font-body text-caption text-neutral-400">
                {rating}
              </span>
              <span className="font-body text-caption text-neutral-300">
                ({reviewCount})
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
