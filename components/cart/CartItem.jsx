// 장바구니 아이템 컴포넌트 — 개별 상품 표시, 수량 변경, 삭제
// 'use client' → 수량 변경 인터랙션

'use client'

import Link from 'next/link'
import { products } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/contexts/CartContext'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  const product = products.find((p) => p.id === item.productId)
  if (!product) return null

  const option = product.options[item.optionIndex]
  const basePrice = product.salePrice || product.price
  const optionPrice = option?.priceAdd || 0
  const unitPrice = basePrice + optionPrice
  const itemTotal = unitPrice * item.quantity

  return (
    <div className="bg-white dark:bg-dm-surface rounded-card p-4 md:p-6 shadow-warm-sm dark:shadow-none dark:border dark:border-dm-border">
      <div className="flex gap-4">
        {/* 상품 이미지 */}
        <Link href={`/products/${product.id}`} className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-cream-dark dark:bg-dm-card rounded-xl flex items-center justify-center">
            <span className="font-body text-small text-neutral-300">IMG</span>
          </div>
        </Link>

        {/* 상품 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link href={`/products/${product.id}`}>
                <h3 className="font-display text-heading-3 text-chocolate dark:text-cream truncate hover:text-gold transition-colors duration-200">
                  {product.name}
                </h3>
              </Link>
              {option && (
                <p className="font-body text-caption text-neutral-400 mt-1">
                  옵션: {option.name}
                  {optionPrice > 0 && ` (+${formatPrice(optionPrice)}원)`}
                </p>
              )}
            </div>

            {/* 삭제 버튼 */}
            <button
              onClick={() => removeFromCart(item.productId, item.optionIndex)}
              className="w-8 h-8 flex items-center justify-center text-neutral-300 hover:text-error transition-colors duration-200 flex-shrink-0"
              aria-label="상품 삭제"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* 수량 + 가격 */}
          <div className="flex items-center justify-between mt-3">
            {/* 수량 조절 */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateQuantity(item.productId, item.optionIndex, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="w-8 h-8 border border-neutral-200 dark:border-dm-border rounded-lg flex items-center justify-center font-body text-caption text-chocolate-light dark:text-neutral-300 hover:border-caramel transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                −
              </button>
              <span className="w-10 h-8 flex items-center justify-center font-body text-caption text-chocolate dark:text-cream font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.productId, item.optionIndex, item.quantity + 1)}
                disabled={item.quantity >= product.stock}
                className="w-8 h-8 border border-neutral-200 dark:border-dm-border rounded-lg flex items-center justify-center font-body text-caption text-chocolate-light dark:text-neutral-300 hover:border-caramel transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>

            {/* 소계 */}
            <span className="font-accent text-body text-gold font-medium">
              {formatPrice(itemTotal)}원
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
