// 신상품 그리드 섹션 — isNew가 true인 상품을 그리드로 표시

import Link from 'next/link'
import { products } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

// 신상품 필터링
const newProducts = products.filter((p) => p.isNew)

export default function NewArrivals() {
  return (
    <section className="py-16 md:py-20 bg-cream dark:bg-dm-bg">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">

        {/* 섹션 헤더 */}
        <div className="text-center mb-10">
          <p className="font-accent text-caption text-caramel font-medium tracking-wider mb-2">
            NEW ARRIVALS
          </p>
          <h2 className="font-display text-heading-1 text-chocolate dark:text-cream">
            새로 나온 디저트
          </h2>
          <p className="font-body text-body text-chocolate-light dark:text-neutral-300 mt-3">
            이번 시즌 새롭게 선보이는 메뉴를 만나보세요
          </p>
        </div>

        {/* 상품 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm dark:shadow-none dark:border dark:border-dm-border overflow-hidden hover:shadow-warm-hover hover:-translate-y-1 transition-all duration-300">
                {/* 이미지 */}
                <div className="bg-cream-dark dark:bg-dm-card h-48 flex items-center justify-center relative">
                  <span className="font-body text-caption text-neutral-300">600 x 450</span>
                  <div className="absolute top-3 left-3">
                    <Badge variant="new">NEW</Badge>
                  </div>
                </div>

                {/* 상품 정보 */}
                <div className="p-4">
                  <h3 className="font-display text-heading-3 text-chocolate dark:text-cream mb-1 truncate">
                    {product.name}
                  </h3>
                  <p className="font-body text-caption text-neutral-400 mb-3 line-clamp-1">
                    {product.description}
                  </p>
                  <span className="font-accent text-body font-medium text-gold">
                    {formatPrice(product.salePrice || product.price)}원
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
