// 주문 요약 컴포넌트 — 총 금액, 배송비, 최종 결제액, 주문 버튼
// 'use client' → useCart 사용

'use client'

import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/contexts/CartContext'

// 배송비 정책: 30,000원 이상 무료배송
const FREE_SHIPPING_THRESHOLD = 30000
const SHIPPING_FEE = 3000

export default function CartSummary() {
  const { cartTotal, cartCount } = useCart()

  const shippingFee = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const finalTotal = cartTotal + shippingFee
  const remainingForFree = FREE_SHIPPING_THRESHOLD - cartTotal

  return (
    <div className="bg-white dark:bg-dm-surface rounded-card p-6 shadow-warm-sm dark:shadow-none dark:border dark:border-dm-border">
      <h2 className="font-display text-heading-2 text-chocolate dark:text-cream mb-6">
        주문 요약
      </h2>

      <div className="space-y-3 mb-6">
        {/* 상품 금액 */}
        <div className="flex justify-between">
          <span className="font-body text-body text-chocolate-light dark:text-neutral-300">
            상품 금액 ({cartCount}개)
          </span>
          <span className="font-body text-body text-chocolate dark:text-cream font-medium">
            {formatPrice(cartTotal)}원
          </span>
        </div>

        {/* 배송비 */}
        <div className="flex justify-between">
          <span className="font-body text-body text-chocolate-light dark:text-neutral-300">배송비</span>
          <span className="font-body text-body text-chocolate dark:text-cream font-medium">
            {shippingFee === 0 ? (
              <span className="text-success">무료</span>
            ) : (
              `${formatPrice(shippingFee)}원`
            )}
          </span>
        </div>

        {/* 무료배송까지 남은 금액 */}
        {shippingFee > 0 && cartTotal > 0 && (
          <p className="font-body text-small text-caramel">
            {formatPrice(remainingForFree)}원 더 담으면 무료배송!
          </p>
        )}
      </div>

      {/* 구분선 */}
      <hr className="border-neutral-200 dark:border-dm-border mb-4" />

      {/* 최종 결제 금액 */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-body text-body-lg text-chocolate dark:text-cream font-medium">
          총 결제 금액
        </span>
        <span className="font-accent text-heading-2 text-gold font-medium">
          {formatPrice(finalTotal)}원
        </span>
      </div>

      {/* 주문하기 버튼 */}
      <Link
        href="/checkout"
        className="block w-full bg-gold text-white rounded-button py-3 font-body font-medium text-body text-center hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-14 leading-[calc(3.5rem-1.5rem)]"
      >
        주문하기
      </Link>

      {/* 쇼핑 계속하기 */}
      <Link
        href="/products"
        className="block w-full text-center mt-3 font-body text-caption text-caramel hover:text-gold transition-colors duration-200"
      >
        쇼핑 계속하기
      </Link>
    </div>
  )
}
