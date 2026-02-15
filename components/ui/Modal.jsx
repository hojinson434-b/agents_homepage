// 모달 컴포넌트 — 상품 상세, 확인 대화상자 등에 사용
// 배경 클릭 시 닫기, ESC 키 닫기, 애니메이션 지원

'use client'

import { useEffect } from 'react'

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    // 모달 열릴 때 스크롤 방지
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-chocolate/50 animate-fade-in"
        onClick={onClose}
      />

      {/* 모달 본체 */}
      <div className={`relative bg-white rounded-card shadow-warm-xl w-full max-w-content max-h-[90vh] overflow-y-auto animate-fade-in-up ${className}`}>
        {/* 헤더 */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="font-display text-heading-2 text-chocolate">{title}</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-chocolate transition-colors duration-200"
              aria-label="닫기"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* 내용 */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
