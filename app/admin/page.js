// 관리자 대시보드 — 주문 현황, 매출 요약, 상품 관리, 주문 관리
// 'use client' → 탭 전환, localStorage 조회

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { products } from '@/lib/products'
import { formatPrice } from '@/lib/utils'

// 탭 목록
const tabs = [
  { id: 'dashboard', label: '대시보드' },
  { id: 'products', label: '상품 관리' },
  { id: 'orders', label: '주문 관리' },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [orders, setOrders] = useState([])

  // 주문 데이터 로드
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('douceur_orders') || '[]')
      setOrders(saved)
    } catch (error) {
      console.error('주문 데이터 로드 실패:', error)
    }
  }, [])

  return (
    <div className="bg-cream dark:bg-dm-bg min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">

        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-heading-1 text-chocolate dark:text-cream">
              관리자 대시보드
            </h1>
            <p className="font-body text-caption text-neutral-400 mt-1">
              Douceur 쇼핑몰 관리
            </p>
          </div>
          <Link
            href="/"
            className="font-body text-caption text-caramel hover:text-gold transition-colors duration-200"
          >
            쇼핑몰로 돌아가기
          </Link>
        </div>

        {/* 탭 */}
        <div className="flex gap-1 mb-8 border-b border-neutral-200 dark:border-dm-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 font-body text-caption font-medium transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'text-gold border-gold'
                  : 'text-neutral-400 border-transparent hover:text-chocolate-light dark:text-neutral-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 탭 컨텐츠 */}
        {activeTab === 'dashboard' && <DashboardTab orders={orders} />}
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'orders' && <OrdersTab orders={orders} />}
      </div>
    </div>
  )
}

// 대시보드 탭
function DashboardTab({ orders }) {
  // 통계 계산
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0

  // 최근 7일 주문
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const recentOrders = orders.filter((o) => new Date(o.orderedAt) >= weekAgo)
  const recentRevenue = recentOrders.reduce((sum, o) => sum + o.total, 0)

  // 인기 상품 (주문 빈도 기준)
  const productCounts = {}
  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!productCounts[item.productName]) {
        productCounts[item.productName] = 0
      }
      productCounts[item.productName] += item.quantity
    })
  })
  const topProducts = Object.entries(productCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const stats = [
    { label: '총 매출', value: `${formatPrice(totalRevenue)}원`, sub: '전체 기간', color: 'text-gold' },
    { label: '총 주문 수', value: `${totalOrders}건`, sub: '전체 기간', color: 'text-chocolate' },
    { label: '평균 주문 금액', value: `${formatPrice(avgOrderValue)}원`, sub: '주문당', color: 'text-caramel' },
    { label: '최근 7일 매출', value: `${formatPrice(recentRevenue)}원`, sub: `${recentOrders.length}건`, color: 'text-success' },
  ]

  return (
    <div className="space-y-8">
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm p-6">
            <p className="font-body text-caption text-neutral-400 mb-1">{stat.label}</p>
            <p className={`font-accent text-heading-2 font-medium ${stat.color}`}>
              {stat.value}
            </p>
            <p className="font-body text-small text-neutral-300 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* 하단 2컬럼 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 인기 상품 */}
        <div className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm p-6">
          <h3 className="font-display text-heading-3 text-chocolate dark:text-cream mb-4">
            인기 상품 TOP 5
          </h3>
          {topProducts.length > 0 ? (
            <div className="space-y-3">
              {topProducts.map(([name, count], index) => (
                <div key={name} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-accent text-small font-medium ${
                    index === 0 ? 'bg-gold text-white' : 'bg-cream dark:bg-dm-card text-neutral-400'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="flex-1 font-body text-caption text-chocolate dark:text-cream truncate">
                    {name}
                  </span>
                  <span className="font-accent text-caption text-caramel font-medium">
                    {count}개
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-body text-caption text-neutral-400">아직 주문 데이터가 없습니다.</p>
          )}
        </div>

        {/* 최근 주문 */}
        <div className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm p-6">
          <h3 className="font-display text-heading-3 text-chocolate dark:text-cream mb-4">
            최근 주문
          </h3>
          {orders.length > 0 ? (
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-b-0">
                  <div>
                    <p className="font-accent text-small text-chocolate dark:text-cream font-medium">
                      {order.id}
                    </p>
                    <p className="font-body text-small text-neutral-400">
                      {new Date(order.orderedAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-accent text-caption text-gold font-medium">
                      {formatPrice(order.total)}원
                    </p>
                    <span className="font-body text-small text-success">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-body text-caption text-neutral-400">아직 주문이 없습니다.</p>
          )}
        </div>
      </div>

      {/* 상품 현황 */}
      <div className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm p-6">
        <h3 className="font-display text-heading-3 text-chocolate dark:text-cream mb-4">
          상품 현황
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-cream dark:bg-dm-card rounded-xl">
            <p className="font-accent text-heading-2 text-chocolate dark:text-cream font-medium">{products.length}</p>
            <p className="font-body text-small text-neutral-400">전체 상품</p>
          </div>
          <div className="text-center p-3 bg-cream dark:bg-dm-card rounded-xl">
            <p className="font-accent text-heading-2 text-success font-medium">
              {products.filter((p) => p.stock > 10).length}
            </p>
            <p className="font-body text-small text-neutral-400">재고 충분</p>
          </div>
          <div className="text-center p-3 bg-cream dark:bg-dm-card rounded-xl">
            <p className="font-accent text-heading-2 text-warning font-medium">
              {products.filter((p) => p.stock > 0 && p.stock <= 10).length}
            </p>
            <p className="font-body text-small text-neutral-400">재고 부족</p>
          </div>
          <div className="text-center p-3 bg-cream dark:bg-dm-card rounded-xl">
            <p className="font-accent text-heading-2 text-error font-medium">
              {products.filter((p) => p.stock === 0).length}
            </p>
            <p className="font-body text-small text-neutral-400">품절</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 상품 관리 탭
function ProductsTab() {
  return (
    <div className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm overflow-hidden">
      {/* 테이블 헤더 */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-cream-dark dark:bg-dm-card font-body text-small text-neutral-400 font-medium">
        <div className="col-span-1">ID</div>
        <div className="col-span-3">상품명</div>
        <div className="col-span-2">카테고리</div>
        <div className="col-span-2">가격</div>
        <div className="col-span-1">재고</div>
        <div className="col-span-1">평점</div>
        <div className="col-span-2">상태</div>
      </div>

      {/* 상품 목록 */}
      <div className="divide-y divide-neutral-100">
        {products.map((product, index) => (
          <div key={product.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 hover:bg-cream/50 transition-colors duration-200">
            {/* 모바일: 상품명 + 정보 */}
            <div className="md:col-span-1 font-accent text-small text-neutral-400">
              <span className="md:hidden font-medium text-chocolate dark:text-cream">#{index + 1} </span>
              <span className="hidden md:inline">{index + 1}</span>
            </div>
            <div className="md:col-span-3">
              <Link href={`/products/${product.id}`} className="font-body text-caption text-chocolate dark:text-cream font-medium hover:text-gold transition-colors duration-200">
                {product.name}
              </Link>
            </div>
            <div className="md:col-span-2 font-body text-caption text-neutral-400">
              {product.category}
            </div>
            <div className="md:col-span-2">
              {product.salePrice ? (
                <div>
                  <span className="font-accent text-caption text-gold font-medium">
                    {formatPrice(product.salePrice)}원
                  </span>
                  <span className="font-body text-small text-neutral-300 line-through ml-1">
                    {formatPrice(product.price)}원
                  </span>
                </div>
              ) : (
                <span className="font-accent text-caption text-chocolate dark:text-cream font-medium">
                  {formatPrice(product.price)}원
                </span>
              )}
            </div>
            <div className="md:col-span-1">
              <span className={`font-body text-caption font-medium ${
                product.stock === 0 ? 'text-error' : product.stock <= 10 ? 'text-warning' : 'text-success'
              }`}>
                {product.stock}
              </span>
            </div>
            <div className="md:col-span-1 font-body text-caption text-chocolate dark:text-cream">
              {product.rating}
            </div>
            <div className="md:col-span-2">
              <div className="flex gap-1.5 flex-wrap">
                {product.badge && (
                  <span className={`font-body text-small px-2 py-0.5 rounded-button ${
                    product.badge === 'BEST' ? 'bg-gold/10 text-gold' :
                    product.badge === 'SALE' ? 'bg-error/10 text-error' :
                    'bg-info/10 text-info'
                  }`}>
                    {product.badge}
                  </span>
                )}
                {product.isNew && (
                  <span className="font-body text-small px-2 py-0.5 rounded-button bg-success/10 text-success">
                    NEW
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 주문 관리 탭
function OrdersTab({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm p-12 text-center">
        <p className="font-body text-body text-neutral-400">아직 주문이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            {/* 주문 정보 */}
            <div>
              <p className="font-accent text-caption text-chocolate dark:text-cream font-medium">
                {order.id}
              </p>
              <p className="font-body text-small text-neutral-400">
                {new Date(order.orderedAt).toLocaleString('ko-KR')}
              </p>
            </div>

            {/* 상태 + 금액 */}
            <div className="flex items-center gap-4">
              <span className="bg-success/10 text-success font-body text-small font-medium px-3 py-1 rounded-button">
                {order.status}
              </span>
              <span className="font-accent text-body text-gold font-medium">
                {formatPrice(order.total)}원
              </span>
            </div>
          </div>

          {/* 배송 정보 */}
          <div className="bg-cream dark:bg-dm-card rounded-xl p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <span className="font-body text-small text-neutral-400">받는 분: </span>
                <span className="font-body text-caption text-chocolate dark:text-cream">{order.shipping.name}</span>
              </div>
              <div>
                <span className="font-body text-small text-neutral-400">연락처: </span>
                <span className="font-body text-caption text-chocolate dark:text-cream">{order.shipping.phone}</span>
              </div>
              <div>
                <span className="font-body text-small text-neutral-400">주소: </span>
                <span className="font-body text-caption text-chocolate dark:text-cream">{order.shipping.address}</span>
              </div>
            </div>
          </div>

          {/* 주문 상품 */}
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-body text-caption text-chocolate-light dark:text-neutral-300">
                  {item.productName} ({item.optionName} x {item.quantity})
                </span>
                <span className="font-body text-caption text-chocolate dark:text-cream font-medium">
                  {formatPrice(item.unitPrice * item.quantity)}원
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
