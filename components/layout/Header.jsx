// 헤더 컴포넌트 — 반응형 네비게이션, 로고, 장바구니/검색 아이콘, 장바구니 수량 뱃지
// 모바일: 햄버거 메뉴, 데스크톱: 가로 네비게이션

'use client'

import { useState } from 'react'
import Link from 'next/link'
import MobileMenu from '@/components/layout/MobileMenu'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'

// 네비게이션 링크 목록
const navLinks = [
  { href: '/products', label: '전체 상품' },
  { href: '/products?category=cake', label: '케이크' },
  { href: '/products?category=cookie', label: '쿠키' },
  { href: '/products?category=macaron', label: '마카롱' },
  { href: '/about', label: '브랜드 소개' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { cartCount } = useCart()
  const { isLoggedIn, user } = useAuth()

  return (
    <header className="bg-white shadow-warm-sm sticky top-0 z-40">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-heading-2 md:text-heading-1 text-chocolate">
              Douceur
            </span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="주요 메뉴">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-body text-chocolate-light hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 아이콘 영역 (검색, 장바구니, 마이페이지) */}
          <div className="flex items-center gap-2">
            {/* 검색 */}
            <Link
              href="/products"
              className="w-12 h-12 flex items-center justify-center text-chocolate-light hover:text-gold transition-colors duration-200"
              aria-label="상품 검색"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </Link>

            {/* 장바구니 (수량 뱃지 포함) */}
            <Link
              href="/cart"
              className="w-12 h-12 flex items-center justify-center text-chocolate-light hover:text-gold transition-colors duration-200 relative"
              aria-label={`장바구니${cartCount > 0 ? ` (${cartCount}개)` : ''}`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold text-white font-accent text-small font-medium rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99' : cartCount}
                </span>
              )}
            </Link>

            {/* 마이페이지 / 로그인 */}
            {isLoggedIn ? (
              <Link
                href="/mypage"
                className="hidden md:flex w-12 h-12 items-center justify-center text-gold transition-colors duration-200"
                aria-label="마이페이지"
                title={user?.name}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="hidden md:flex w-12 h-12 items-center justify-center text-chocolate-light hover:text-gold transition-colors duration-200"
                aria-label="로그인"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            )}

            {/* 모바일 햄버거 메뉴 버튼 */}
            <button
              className="lg:hidden w-12 h-12 flex items-center justify-center text-chocolate-light hover:text-gold transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="메뉴 열기"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </header>
  )
}
