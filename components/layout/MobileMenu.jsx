// 모바일 메뉴 컴포넌트 — 슬라이드 인 사이드바 방식
// Header에서 햄버거 버튼 클릭 시 열림

'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function MobileMenu({ isOpen, onClose, navLinks }) {
  // 열릴 때 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* 배경 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-chocolate/50 z-40 animate-fade-in lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 사이드바 */}
      <nav
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-warm-xl z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="모바일 메뉴"
      >
        {/* 닫기 버튼 */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <span className="font-display text-heading-3 text-chocolate">메뉴</span>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center text-neutral-400 hover:text-chocolate transition-colors duration-200"
            aria-label="메뉴 닫기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* 네비게이션 링크 */}
        <div className="py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-6 py-4 font-body text-body text-chocolate-light hover:bg-cream hover:text-gold transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* 하단 링크 */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 p-4">
          <Link
            href="/auth/login"
            onClick={onClose}
            className="block w-full text-center py-3 font-body text-body text-chocolate-light hover:text-gold transition-colors duration-200"
          >
            로그인
          </Link>
          <Link
            href="/mypage"
            onClick={onClose}
            className="block w-full text-center py-3 font-body text-body text-chocolate-light hover:text-gold transition-colors duration-200"
          >
            마이페이지
          </Link>
        </div>
      </nav>
    </>
  )
}
