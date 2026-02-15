// 마이페이지 — 주문 내역, 정보 수정, 찜 목록 탭
// 'use client' → useAuth, 탭 전환, localStorage 조회

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { products } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import ProductCard from '@/components/product/ProductCard'

// 탭 목록
const tabs = [
  { id: 'orders', label: '주문 내역' },
  { id: 'wishlist', label: '찜 목록' },
  { id: 'profile', label: '정보 수정' },
]

export default function MyPage() {
  const router = useRouter()
  const { user, isLoggedIn, isLoaded, logout, updateProfile } = useAuth()
  const { wishlistItems } = useWishlist()

  const [activeTab, setActiveTab] = useState('orders')
  const [orders, setOrders] = useState([])

  // 주문 내역 불러오기
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('douceur_orders') || '[]')
      setOrders(saved)
    } catch (error) {
      console.error('주문 내역 로드 실패:', error)
    }
  }, [])

  // 로딩 중
  if (!isLoaded) {
    return (
      <div className="bg-cream dark:bg-dm-bg min-h-screen">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="h-10 w-32 bg-neutral-200 rounded-xl animate-pulse" />
        </div>
      </div>
    )
  }

  // 비로그인 → 로그인 페이지로
  if (!isLoggedIn) {
    router.push('/auth/login')
    return null
  }

  // 찜한 상품 목록
  const wishlistProducts = products.filter((p) => wishlistItems.includes(p.id))

  // 로그아웃
  function handleLogout() {
    logout()
    router.push('/')
  }

  return (
    <div className="bg-cream dark:bg-dm-bg min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">

        {/* 헤더 영역 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-heading-1 text-chocolate dark:text-cream">
              마이페이지
            </h1>
            <p className="font-body text-body text-neutral-400 mt-1">
              안녕하세요, <span className="text-chocolate dark:text-cream font-medium">{user.name}</span>님
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="font-body text-caption text-neutral-400 hover:text-error transition-colors duration-200"
          >
            로그아웃
          </button>
        </div>

        {/* 탭 네비게이션 */}
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
              {tab.id === 'wishlist' && wishlistItems.length > 0 && (
                <span className="ml-1.5 bg-gold text-white text-small font-accent px-1.5 py-0.5 rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* 탭 컨텐츠 */}
        {activeTab === 'orders' && (
          <OrdersTab orders={orders} />
        )}
        {activeTab === 'wishlist' && (
          <WishlistTab products={wishlistProducts} />
        )}
        {activeTab === 'profile' && (
          <ProfileTab user={user} updateProfile={updateProfile} />
        )}
      </div>
    </div>
  )
}

// 주문 내역 탭
function OrdersTab({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-cream-dark dark:bg-dm-card rounded-full flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <h3 className="font-display text-heading-3 text-chocolate dark:text-cream mb-2">
          주문 내역이 없습니다
        </h3>
        <p className="font-body text-caption text-neutral-400 mb-6">
          맛있는 디저트를 주문해보세요
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-gold text-white rounded-button px-6 py-2.5 font-body font-medium text-caption hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-10"
        >
          상품 둘러보기
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm p-6">
          {/* 주문 헤더 */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-accent text-caption text-chocolate dark:text-cream font-medium">
                {order.id}
              </p>
              <p className="font-body text-small text-neutral-400">
                {new Date(order.orderedAt).toLocaleDateString('ko-KR')}
              </p>
            </div>
            <span className="bg-success/10 text-success font-body text-small font-medium px-3 py-1 rounded-button">
              {order.status}
            </span>
          </div>

          {/* 주문 상품 */}
          <div className="space-y-2 mb-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <p className="font-body text-caption text-chocolate-light dark:text-neutral-300">
                  {item.productName}
                  <span className="text-neutral-400"> ({item.optionName} x {item.quantity})</span>
                </p>
                <span className="font-body text-caption text-chocolate dark:text-cream font-medium">
                  {formatPrice(item.unitPrice * item.quantity)}원
                </span>
              </div>
            ))}
          </div>

          {/* 총 금액 */}
          <hr className="border-neutral-100 mb-3" />
          <div className="flex justify-between items-center">
            <span className="font-body text-caption text-neutral-400">총 결제 금액</span>
            <span className="font-accent text-body text-gold font-medium">
              {formatPrice(order.total)}원
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// 찜 목록 탭
function WishlistTab({ products: wishlistProducts }) {
  if (wishlistProducts.length === 0) {
    return (
      <div className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-cream-dark dark:bg-dm-card rounded-full flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h3 className="font-display text-heading-3 text-chocolate dark:text-cream mb-2">
          찜한 상품이 없습니다
        </h3>
        <p className="font-body text-caption text-neutral-400 mb-6">
          마음에 드는 디저트를 찜해보세요
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-gold text-white rounded-button px-6 py-2.5 font-body font-medium text-caption hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-10"
        >
          상품 둘러보기
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {wishlistProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

// 정보 수정 탭
function ProfileTab({ user, updateProfile }) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    address: user.address || '',
  })
  const [saved, setSaved] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (saved) setSaved(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    updateProfile({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm p-6 md:p-8 max-w-2xl">
      <h3 className="font-display text-heading-2 text-chocolate dark:text-cream mb-6">
        회원 정보
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 이메일 (수정 불가) */}
        <div>
          <label className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
            이메일
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full h-12 px-4 border border-neutral-200 dark:border-dm-border rounded-xl font-body text-body text-neutral-400 bg-cream-dark dark:bg-dm-card dark:text-cream cursor-not-allowed"
          />
          <p className="mt-1 font-body text-small text-neutral-300">이메일은 변경할 수 없습니다</p>
        </div>

        {/* 이름 */}
        <div>
          <label htmlFor="profileName" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
            이름
          </label>
          <input
            type="text"
            id="profileName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-12 px-4 border border-neutral-200 dark:border-dm-border rounded-xl font-body text-body text-chocolate dark:bg-dm-card dark:text-cream focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200"
          />
        </div>

        {/* 연락처 */}
        <div>
          <label htmlFor="profilePhone" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
            연락처
          </label>
          <input
            type="tel"
            id="profilePhone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="010-0000-0000"
            className="w-full h-12 px-4 border border-neutral-200 dark:border-dm-border rounded-xl font-body text-body text-chocolate dark:bg-dm-card dark:text-cream focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200"
          />
        </div>

        {/* 주소 */}
        <div>
          <label htmlFor="profileAddress" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
            주소
          </label>
          <input
            type="text"
            id="profileAddress"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="기본 배송지를 입력해주세요"
            className="w-full h-12 px-4 border border-neutral-200 dark:border-dm-border rounded-xl font-body text-body text-chocolate dark:bg-dm-card dark:text-cream focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200"
          />
        </div>

        {/* 가입일 */}
        <div>
          <label className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
            가입일
          </label>
          <p className="font-body text-body text-neutral-400">
            {new Date(user.joinedAt).toLocaleDateString('ko-KR')}
          </p>
        </div>

        {/* 저장 버튼 */}
        <div className="pt-2">
          <button
            type="submit"
            className="bg-gold text-white rounded-button px-8 py-3 font-body font-medium text-body hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-12"
          >
            정보 저장
          </button>

          {saved && (
            <span className="ml-3 font-body text-caption text-success">
              저장되었습니다
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
