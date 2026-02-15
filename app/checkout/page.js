// 주문/결제 페이지 — 배송 정보 입력, 결제 수단 선택 (UI), 주문 요약
// 'use client' → 폼 입력 + useCart

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { products } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/contexts/CartContext'

// 배송비 정책
const FREE_SHIPPING_THRESHOLD = 30000
const SHIPPING_FEE = 3000

// 결제 수단 목록
const paymentMethods = [
  { id: 'card', name: '신용/체크카드', icon: '💳' },
  { id: 'bank', name: '무통장입금', icon: '🏦' },
  { id: 'kakao', name: '카카오페이', icon: '💛' },
  { id: 'naver', name: '네이버페이', icon: '💚' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, cartTotal, cartCount, clearCart, isLoaded } = useCart()

  // 배송 정보 폼 상태
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    zipcode: '',
    address: '',
    addressDetail: '',
    message: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)

  const shippingFee = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const finalTotal = cartTotal + shippingFee

  // 입력값 변경 핸들러
  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 주문하기 핸들러
  function handleSubmit(e) {
    e.preventDefault()

    // 간단한 유효성 검사
    if (!formData.name || !formData.phone || !formData.address) {
      alert('필수 정보를 입력해주세요.')
      return
    }

    setIsProcessing(true)

    // 주문 데이터 생성 (localStorage에 저장)
    const order = {
      id: `ORD-${Date.now()}`,
      items: cartItems.map((item) => {
        const product = products.find((p) => p.id === item.productId)
        return {
          productId: item.productId,
          productName: product?.name || '',
          optionName: product?.options[item.optionIndex]?.name || '',
          quantity: item.quantity,
          unitPrice: (product?.salePrice || product?.price || 0) + (product?.options[item.optionIndex]?.priceAdd || 0),
        }
      }),
      shipping: { ...formData },
      paymentMethod,
      subtotal: cartTotal,
      shippingFee,
      total: finalTotal,
      status: '결제완료',
      orderedAt: new Date().toISOString(),
    }

    // 주문 내역 localStorage에 저장
    try {
      const existingOrders = JSON.parse(localStorage.getItem('douceur_orders') || '[]')
      existingOrders.unshift(order)
      localStorage.setItem('douceur_orders', JSON.stringify(existingOrders))
    } catch (error) {
      console.error('주문 저장 실패:', error)
    }

    // 장바구니 비우기
    clearCart()

    // 주문 완료 페이지로 이동
    setTimeout(() => {
      router.push(`/checkout/complete?orderId=${order.id}`)
    }, 500)
  }

  // 로딩 중
  if (!isLoaded) {
    return (
      <div className="bg-cream dark:bg-dm-bg min-h-screen">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="h-10 w-40 bg-neutral-200 rounded-xl animate-pulse" />
        </div>
      </div>
    )
  }

  // 장바구니가 비어있으면 리다이렉트
  if (cartItems.length === 0) {
    return (
      <div className="bg-cream dark:bg-dm-bg min-h-screen">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm p-12 text-center">
            <h2 className="font-display text-heading-2 text-chocolate mb-2">
              주문할 상품이 없습니다
            </h2>
            <p className="font-body text-body text-neutral-400 mb-8">
              장바구니에 상품을 담아주세요
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

        {/* 페이지 제목 */}
        <h1 className="font-display text-heading-1 text-chocolate mb-8">
          주문/결제
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* 왼쪽: 배송 정보 + 결제 수단 */}
            <div className="lg:col-span-2 space-y-6">

              {/* 배송 정보 */}
              <section className="bg-white dark:bg-dm-surface rounded-card p-6 shadow-warm-sm">
                <h2 className="font-display text-heading-2 text-chocolate mb-6">
                  배송 정보
                </h2>

                <div className="space-y-4">
                  {/* 이름 */}
                  <div>
                    <label htmlFor="name" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
                      받는 분 <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="이름을 입력해주세요"
                      required
                      className="w-full h-12 px-4 border border-neutral-200 dark:border-dm-border rounded-xl font-body text-body text-chocolate dark:text-cream dark:bg-dm-card focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200"
                    />
                  </div>

                  {/* 연락처 */}
                  <div>
                    <label htmlFor="phone" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
                      연락처 <span className="text-error">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="010-0000-0000"
                      required
                      className="w-full h-12 px-4 border border-neutral-200 dark:border-dm-border rounded-xl font-body text-body text-chocolate dark:text-cream dark:bg-dm-card focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200"
                    />
                  </div>

                  {/* 우편번호 */}
                  <div>
                    <label htmlFor="zipcode" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
                      우편번호
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        placeholder="우편번호"
                        className="flex-1 h-12 px-4 border border-neutral-200 dark:border-dm-border rounded-xl font-body text-body text-chocolate dark:text-cream dark:bg-dm-card focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200"
                      />
                      <button
                        type="button"
                        className="border border-caramel text-chocolate-light dark:text-neutral-300 rounded-xl px-5 font-body text-caption hover:bg-caramel hover:text-white transition-all duration-300 h-12 flex-shrink-0"
                      >
                        주소 검색
                      </button>
                    </div>
                  </div>

                  {/* 주소 */}
                  <div>
                    <label htmlFor="address" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
                      주소 <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="주소를 입력해주세요"
                      required
                      className="w-full h-12 px-4 border border-neutral-200 dark:border-dm-border rounded-xl font-body text-body text-chocolate dark:text-cream dark:bg-dm-card focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200"
                    />
                  </div>

                  {/* 상세 주소 */}
                  <div>
                    <label htmlFor="addressDetail" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
                      상세 주소
                    </label>
                    <input
                      type="text"
                      id="addressDetail"
                      name="addressDetail"
                      value={formData.addressDetail}
                      onChange={handleChange}
                      placeholder="상세 주소 (동/호수 등)"
                      className="w-full h-12 px-4 border border-neutral-200 dark:border-dm-border rounded-xl font-body text-body text-chocolate dark:text-cream dark:bg-dm-card focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200"
                    />
                  </div>

                  {/* 배송 메모 */}
                  <div>
                    <label htmlFor="message" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
                      배송 메모
                    </label>
                    <select
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full h-12 px-4 border border-neutral-200 dark:border-dm-border rounded-xl font-body text-body text-chocolate dark:text-cream dark:bg-dm-card focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200 bg-white"
                    >
                      <option value="">배송 메모를 선택해주세요</option>
                      <option value="문 앞에 놓아주세요">문 앞에 놓아주세요</option>
                      <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                      <option value="부재 시 연락 부탁드립니다">부재 시 연락 부탁드립니다</option>
                      <option value="배송 전 연락 부탁드립니다">배송 전 연락 부탁드립니다</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* 결제 수단 */}
              <section className="bg-white dark:bg-dm-surface rounded-card p-6 shadow-warm-sm">
                <h2 className="font-display text-heading-2 text-chocolate mb-6">
                  결제 수단
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                        paymentMethod === method.id
                          ? 'border-gold bg-gold/5'
                          : 'border-neutral-200 dark:border-dm-border hover:border-caramel'
                      }`}
                    >
                      <span className="block text-heading-3 mb-1">{method.icon}</span>
                      <span className="font-body text-small text-chocolate">
                        {method.name}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* 오른쪽: 주문 요약 */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="bg-white dark:bg-dm-surface rounded-card p-6 shadow-warm-sm">
                  <h2 className="font-display text-heading-2 text-chocolate mb-6">
                    주문 요약
                  </h2>

                  {/* 주문 상품 목록 */}
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => {
                      const product = products.find((p) => p.id === item.productId)
                      if (!product) return null
                      const option = product.options[item.optionIndex]
                      const unitPrice = (product.salePrice || product.price) + (option?.priceAdd || 0)

                      return (
                        <div key={`${item.productId}-${item.optionIndex}`} className="flex justify-between">
                          <div className="flex-1 min-w-0 mr-3">
                            <p className="font-body text-caption text-chocolate truncate">
                              {product.name}
                            </p>
                            {option && (
                              <p className="font-body text-small text-neutral-400">
                                {option.name} x {item.quantity}
                              </p>
                            )}
                          </div>
                          <span className="font-body text-caption text-chocolate font-medium flex-shrink-0">
                            {formatPrice(unitPrice * item.quantity)}원
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  <hr className="border-neutral-200 dark:border-dm-border mb-4" />

                  {/* 금액 상세 */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="font-body text-caption text-chocolate-light">
                        상품 금액 ({cartCount}개)
                      </span>
                      <span className="font-body text-caption text-chocolate">
                        {formatPrice(cartTotal)}원
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-body text-caption text-chocolate-light">배송비</span>
                      <span className="font-body text-caption text-chocolate">
                        {shippingFee === 0 ? (
                          <span className="text-success">무료</span>
                        ) : (
                          `${formatPrice(shippingFee)}원`
                        )}
                      </span>
                    </div>
                  </div>

                  <hr className="border-neutral-200 dark:border-dm-border mb-4" />

                  {/* 최종 금액 */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-body text-body text-chocolate font-medium">
                      총 결제 금액
                    </span>
                    <span className="font-accent text-heading-2 text-gold font-medium">
                      {formatPrice(finalTotal)}원
                    </span>
                  </div>

                  {/* 결제하기 버튼 */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gold text-white rounded-button py-3 font-body font-medium text-body hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-14 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isProcessing ? '처리 중...' : `${formatPrice(finalTotal)}원 결제하기`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
