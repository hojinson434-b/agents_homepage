// 상품 이미지 갤러리 컴포넌트 — 메인 이미지 + 썸네일 선택
// 상품 상세 페이지에서 사용

'use client'

import { useState } from 'react'

export default function ProductGallery({ images = [], productName = '' }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  // 이미지가 없을 경우 플레이스홀더
  const displayImages = images.length > 0
    ? images
    : ['/images/products/placeholder.jpg']

  return (
    <div className="space-y-4">
      {/* 메인 이미지 */}
      <div className="bg-cream-dark rounded-card overflow-hidden aspect-square flex items-center justify-center">
        <span className="font-body text-body text-neutral-300">
          800 x 800
        </span>
      </div>

      {/* 썸네일 목록 (이미지 2개 이상일 때만 표시) */}
      {displayImages.length > 1 && (
        <div className="flex gap-3">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-20 h-20 rounded-xl overflow-hidden bg-cream-dark flex items-center justify-center border-2 transition-all duration-200 ${
                index === selectedIndex
                  ? 'border-gold'
                  : 'border-transparent hover:border-caramel'
              }`}
              aria-label={`${productName} 이미지 ${index + 1}`}
            >
              <span className="font-body text-small text-neutral-300">
                {index + 1}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
