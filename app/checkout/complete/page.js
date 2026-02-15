// 주문 완료 페이지 — 주문 성공 확인, 주문 번호, 요약 정보
// 'use client' → useSearchParams, localStorage 조회

'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

// Suspense로 감싸는 래퍼 (useSearchParams 필수)
export default function OrderCompletePage() {
  return (
    <Suspense fallback={<OrderCompleteLoading />}>
      <OrderCompleteContent />
    </Suspense>
  )
}

// 로딩 상태
function OrderCompleteLoading() {
  return (
    <div className="bg-cream min-h-screen flex items-center justify-center">
      <div className="h-10 w-48 bg-neutral-200 rounded-xl animate-pulse" />
    </div>
  )
}

// 실제 주문 완료 컨텐츠
function OrderCompleteContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  // localStorage에서 주문 정보 조회
  let order = null
  try {
    const orders = JSON.parse(localStorage.getItem('douceur_orders') || '[]')
    order = orders.find((o) => o.id === orderId)
  } catch (error) {
    console.error('주문 정보 조회 실패:', error)
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">

        {/* 성공 아이콘 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-success/10 rounded-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="font-display text-heading-1 text-chocolate mb-2">
            주문이 완료되었습니다
          </h1>
          <p className="font-body text-body text-neutral-400">
            감사합니다! 주문하신 디저트를 정성껏 준비하겠습니다.
          </p>
        </div>

        {/* 주문 정보 카드 */}
        {order && (
          <div className="bg-white rounded-card shadow-warm-sm p-6 md:p-8 mb-8">
            <h2 className="font-display text-heading-2 text-chocolate mb-6">
              주문 정보
            </h2>

            {/* 주문 번호 + 일시 */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="font-body text-caption text-neutral-400">주문 번호</span>
                <span className="font-accent text-caption text-chocolate font-medium">
                  {order.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-caption text-neutral-400">주문 일시</span>
                <span className="font-body text-caption text-chocolate">
                  {new Date(order.orderedAt).toLocaleString('ko-KR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-caption text-neutral-400">결제 수단</span>
                <span className="font-body text-caption text-chocolate">
                  {order.paymentMethod === 'card' && '신용/체크카드'}
                  {order.paymentMethod === 'bank' && '무통장입금'}
                  {order.paymentMethod === 'kakao' && '카카오페이'}
                  {order.paymentMethod === 'naver' && '네이버페이'}
                </span>
              </div>
            </div>

            <hr className="border-neutral-200 mb-6" />

            {/* 주문 상품 */}
            <h3 className="font-body text-body text-chocolate font-medium mb-4">
              주문 상품
            </h3>
            <div className="space-y-3 mb-6">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-body text-caption text-chocolate">
                      {item.productName}
                    </p>
                    <p className="font-body text-small text-neutral-400">
                      {item.optionName} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-body text-caption text-chocolate font-medium">
                    {formatPrice(item.unitPrice * item.quantity)}원
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-neutral-200 mb-6" />

            {/* 배송 정보 */}
            <h3 className="font-body text-body text-chocolate font-medium mb-4">
              배송 정보
            </h3>
            <div className="space-y-2 mb-6">
              <div className="flex gap-3">
                <span className="font-body text-caption text-neutral-400 w-16 flex-shrink-0">받는 분</span>
                <span className="font-body text-caption text-chocolate">{order.shipping.name}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-body text-caption text-neutral-400 w-16 flex-shrink-0">연락처</span>
                <span className="font-body text-caption text-chocolate">{order.shipping.phone}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-body text-caption text-neutral-400 w-16 flex-shrink-0">주소</span>
                <span className="font-body text-caption text-chocolate">
                  {order.shipping.address} {order.shipping.addressDetail}
                </span>
              </div>
              {order.shipping.message && (
                <div className="flex gap-3">
                  <span className="font-body text-caption text-neutral-400 w-16 flex-shrink-0">메모</span>
                  <span className="font-body text-caption text-chocolate">{order.shipping.message}</span>
                </div>
              )}
            </div>

            <hr className="border-neutral-200 mb-4" />

            {/* 결제 금액 */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="font-body text-caption text-neutral-400">상품 금액</span>
                <span className="font-body text-caption text-chocolate">{formatPrice(order.subtotal)}원</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-caption text-neutral-400">배송비</span>
                <span className="font-body text-caption text-chocolate">
                  {order.shippingFee === 0 ? (
                    <span className="text-success">무료</span>
                  ) : (
                    `${formatPrice(order.shippingFee)}원`
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-cream-dark rounded-xl">
              <span className="font-body text-body text-chocolate font-medium">총 결제 금액</span>
              <span className="font-accent text-heading-2 text-gold font-medium">
                {formatPrice(order.total)}원
              </span>
            </div>
          </div>
        )}

        {/* 주문 정보가 없는 경우 */}
        {!order && orderId && (
          <div className="bg-white rounded-card shadow-warm-sm p-8 text-center mb-8">
            <p className="font-body text-body text-neutral-400">
              주문 번호: <span className="font-accent text-chocolate">{orderId}</span>
            </p>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-gold text-white rounded-button px-8 py-3 font-body font-medium hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-12"
          >
            쇼핑 계속하기
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-caramel text-chocolate-light rounded-button px-8 py-3 font-body font-medium hover:bg-caramel hover:text-white transition-all duration-300 h-12"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
