// 인기 상품 섹션 — 메인 페이지에서 리뷰 많은 상품 4개를 가로 스크롤로 표시

import Link from 'next/link'
import { products } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

// 리뷰 수 기준 상위 4개 인기 상품
const popularProducts = [...products]
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 4)

export default function PopularProducts() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">

        {/* 섹션 헤더 */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-accent text-caption text-caramel font-medium tracking-wider mb-2">
              BEST SELLERS
            </p>
            <h2 className="font-display text-heading-1 text-chocolate">
              인기 상품
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-1 font-body text-caption text-caramel hover:text-gold transition-colors duration-200"
          >
            전체 보기
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>

        {/* 상품 그리드 (모바일: 가로 스크롤, 데스크톱: 4열) */}
        <div className="flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible scrollbar-hide">
          {popularProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="flex-shrink-0 w-64 lg:w-auto"
            >
              <div className="bg-white rounded-card shadow-warm-sm overflow-hidden hover:shadow-warm-hover hover:-translate-y-1 transition-all duration-300">
                {/* 이미지 */}
                <div className="bg-cream-dark h-48 lg:h-56 flex items-center justify-center relative">
                  <span className="font-body text-caption text-neutral-300">600 x 450</span>
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge variant={product.badge === 'BEST' ? 'best' : product.badge === 'SALE' ? 'sale' : 'new'}>
                        {product.badge}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* 상품 정보 */}
                <div className="p-4">
                  <h3 className="font-display text-heading-3 text-chocolate mb-1 truncate">
                    {product.name}
                  </h3>
                  <p className="font-body text-caption text-neutral-400 mb-3 line-clamp-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      {product.salePrice ? (
                        <>
                          <span className="font-accent text-body font-medium text-gold">
                            {formatPrice(product.salePrice)}원
                          </span>
                          <span className="font-body text-small text-neutral-300 line-through">
                            {formatPrice(product.price)}원
                          </span>
                        </>
                      ) : (
                        <span className="font-accent text-body font-medium text-gold">
                          {formatPrice(product.price)}원
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gold text-caption">★</span>
                      <span className="font-body text-caption text-neutral-400">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 모바일 전체 보기 링크 */}
        <div className="mt-6 text-center md:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 font-body text-caption text-caramel hover:text-gold transition-colors duration-200"
          >
            전체 보기
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
