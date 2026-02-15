// 장바구니 페이지 — 담은 상품 목록, 수량 변경, 삭제, 주문 요약
// 'use client' → useCart 사용

'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'

export default function CartPage() {
  const { cartItems, isLoaded, clearCart } = useCart()

  // 로딩 중 스켈레톤
  if (!isLoaded) {
    return (
      <div className="bg-cream dark:bg-dm-bg min-h-screen">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="h-10 w-32 bg-neutral-200 rounded-xl animate-pulse mb-8" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-white dark:bg-dm-surface rounded-card animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 빈 장바구니
  if (cartItems.length === 0) {
    return (
      <div className="bg-cream dark:bg-dm-bg min-h-screen">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="font-display text-heading-1 text-chocolate mb-8">
            장바구니
          </h1>

          <div className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm p-12 text-center">
            {/* 빈 장바구니 아이콘 */}
            <div className="w-20 h-20 mx-auto mb-6 bg-cream-dark dark:bg-dm-card rounded-full flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>

            <h2 className="font-display text-heading-2 text-chocolate mb-2">
              장바구니가 비어있습니다
            </h2>
            <p className="font-body text-body text-neutral-400 mb-8">
              달콤한 디저트를 담아보세요
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gold text-white rounded-button px-8 py-3 font-body font-medium hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-12"
            >
              상품 둘러보기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-cream dark:bg-dm-bg min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">

        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-heading-1 text-chocolate">
            장바구니
          </h1>
          <button
            onClick={clearCart}
            className="font-body text-caption text-neutral-400 hover:text-error transition-colors duration-200"
          >
            전체 삭제
          </button>
        </div>

        {/* 장바구니 내용 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* 왼쪽: 상품 목록 */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={`${item.productId}-${item.optionIndex}`}
                item={item}
              />
            ))}
          </div>

          {/* 오른쪽: 주문 요약 */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
