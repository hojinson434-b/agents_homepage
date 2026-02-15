// 상품 상세 페이지 — 이미지 갤러리, 옵션 선택, 수량, 장바구니 담기, 찜하기, 리뷰
// 'use client' → 옵션 선택, 수량 변경, 장바구니/찜 인터랙션

'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { products } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import ProductGallery from '@/components/product/ProductGallery'
import ProductReview from '@/components/product/ProductReview'
import ProductCard from '@/components/product/ProductCard'
import Badge from '@/components/ui/Badge'

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const product = products.find((p) => p.id === id)

  const [selectedOption, setSelectedOption] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showCartAlert, setShowCartAlert] = useState(false)

  // 상품을 찾을 수 없는 경우
  if (!product) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-heading-1 text-chocolate mb-4">
            상품을 찾을 수 없습니다
          </h1>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gold text-white rounded-button px-8 py-3 font-body font-medium hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-12"
          >
            상품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  // 최종 가격 계산 (기본가 또는 할인가 + 옵션 추가금)
  const basePrice = product.salePrice || product.price
  const optionPrice = product.options[selectedOption]?.priceAdd || 0
  const totalPrice = (basePrice + optionPrice) * quantity

  // 할인율
  const discountRate = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  // 관련 상품 (같은 카테고리, 현재 상품 제외, 최대 4개)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  // 수량 변경 핸들러
  function handleQuantityChange(delta) {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, product.stock)))
  }

  // 장바구니 담기 핸들러
  function handleAddToCart() {
    addToCart(product.id, selectedOption, quantity)
    setShowCartAlert(true)
    setTimeout(() => setShowCartAlert(false), 2000)
  }

  // 바로 구매 핸들러
  function handleBuyNow() {
    addToCart(product.id, selectedOption, quantity)
    router.push('/cart')
  }

  // 찜 여부
  const wishlisted = isInWishlist(product.id)

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">

        {/* 브레드크럼 */}
        <nav className="mb-6 font-body text-caption text-neutral-400" aria-label="경로">
          <Link href="/" className="hover:text-gold transition-colors duration-200">홈</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-gold transition-colors duration-200">전체 상품</Link>
          <span className="mx-2">/</span>
          <span className="text-chocolate-light">{product.name}</span>
        </nav>

        {/* 상품 정보 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* 왼쪽: 이미지 갤러리 */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* 오른쪽: 상품 정보 */}
          <div>
            {/* 배지 */}
            {product.badge && (
              <div className="mb-3">
                <Badge variant={product.badge === 'BEST' ? 'best' : product.badge === 'SALE' ? 'sale' : 'new'}>
                  {product.badge}
                </Badge>
              </div>
            )}

            {/* 상품명 */}
            <h1 className="font-display text-heading-1 text-chocolate mb-1">
              {product.name}
            </h1>
            <p className="font-accent text-caption text-neutral-400 mb-4">
              {product.nameEn}
            </p>

            {/* 별점 */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-body ${i < Math.floor(product.rating) ? 'text-gold' : 'text-neutral-200'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="font-body text-caption text-neutral-400">
                {product.rating} ({product.reviewCount}개 리뷰)
              </span>
            </div>

            {/* 가격 */}
            <div className="mb-6">
              {product.salePrice ? (
                <div className="flex items-baseline gap-3">
                  <span className="font-accent text-heading-1 text-gold font-medium">
                    {formatPrice(product.salePrice)}원
                  </span>
                  <span className="font-body text-body text-neutral-300 line-through">
                    {formatPrice(product.price)}원
                  </span>
                  <span className="font-accent text-body text-error font-medium">
                    -{discountRate}%
                  </span>
                </div>
              ) : (
                <span className="font-accent text-heading-1 text-gold font-medium">
                  {formatPrice(product.price)}원
                </span>
              )}
            </div>

            {/* 설명 */}
            <p className="font-body text-body text-chocolate-light leading-relaxed mb-8">
              {product.detailDescription}
            </p>

            {/* 구분선 */}
            <hr className="border-neutral-200 mb-6" />

            {/* 옵션 선택 */}
            {product.options.length > 1 && (
              <div className="mb-6">
                <p className="font-body text-caption text-chocolate font-medium mb-3">
                  옵션 선택
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedOption(index)}
                      className={`px-5 py-2 rounded-button font-body text-caption transition-all duration-200 h-10 ${
                        selectedOption === index
                          ? 'bg-gold text-white'
                          : 'border border-neutral-200 text-chocolate-light hover:border-caramel'
                      }`}
                    >
                      {option.name}
                      {option.priceAdd > 0 && ` (+${formatPrice(option.priceAdd)}원)`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 수량 선택 */}
            <div className="mb-6">
              <p className="font-body text-caption text-chocolate font-medium mb-3">
                수량
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 border border-neutral-200 rounded-xl flex items-center justify-center font-body text-body text-chocolate-light hover:border-caramel transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  −
                </button>
                <span className="w-14 h-10 flex items-center justify-center font-body text-body text-chocolate font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 border border-neutral-200 rounded-xl flex items-center justify-center font-body text-body text-chocolate-light hover:border-caramel transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  +
                </button>
                <span className="ml-3 font-body text-small text-neutral-400">
                  재고 {product.stock}개
                </span>
              </div>
            </div>

            {/* 총 금액 */}
            <div className="flex items-center justify-between mb-6 p-4 bg-cream-dark rounded-xl">
              <span className="font-body text-body text-chocolate font-medium">총 금액</span>
              <span className="font-accent text-heading-2 text-gold font-medium">
                {formatPrice(totalPrice)}원
              </span>
            </div>

            {/* 찜하기 + 장바구니 + 구매 버튼 */}
            <div className="flex gap-3">
              {/* 찜하기 */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 h-14 flex items-center justify-center border rounded-button transition-all duration-300 flex-shrink-0 ${
                  wishlisted
                    ? 'border-rose bg-rose/10 text-rose'
                    : 'border-neutral-200 text-neutral-300 hover:border-rose hover:text-rose'
                }`}
                aria-label={wishlisted ? '찜 해제' : '찜하기'}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              {/* 장바구니 담기 */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gold text-white rounded-button py-3 font-body font-medium text-body hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-14"
              >
                장바구니 담기
              </button>

              {/* 바로 구매 */}
              <button
                onClick={handleBuyNow}
                className="flex-1 border border-caramel text-chocolate-light rounded-button py-3 font-body font-medium text-body hover:bg-caramel hover:text-white transition-all duration-300 h-14"
              >
                바로 구매
              </button>
            </div>

            {/* 장바구니 담기 알림 */}
            {showCartAlert && (
              <div className="mt-3 p-3 bg-success/10 border border-success/20 rounded-xl flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success flex-shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="font-body text-caption text-success">
                  장바구니에 담았습니다
                </span>
                <Link href="/cart" className="ml-auto font-body text-caption text-gold hover:underline">
                  바로가기
                </Link>
              </div>
            )}

            {/* 상품 정보 */}
            <div className="mt-8 space-y-3">
              {product.allergens.length > 0 && (
                <div className="flex items-start gap-3">
                  <span className="font-body text-caption text-neutral-400 w-20 flex-shrink-0">알레르기</span>
                  <span className="font-body text-caption text-chocolate-light">
                    {product.allergens.join(', ')}
                  </span>
                </div>
              )}
              <div className="flex items-start gap-3">
                <span className="font-body text-caption text-neutral-400 w-20 flex-shrink-0">보관 방법</span>
                <span className="font-body text-caption text-chocolate-light">{product.storageMethod}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-body text-caption text-neutral-400 w-20 flex-shrink-0">유통기한</span>
                <span className="font-body text-caption text-chocolate-light">{product.shelfLife}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 리뷰 섹션 */}
        <ProductReview
          productId={product.id}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />

        {/* 관련 상품 */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-heading-2 text-chocolate mb-6">
              관련 상품
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
