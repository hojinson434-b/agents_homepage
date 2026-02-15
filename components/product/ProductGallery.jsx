// 상품 이미지 갤러리 컴포넌트 — 메인 이미지 + 썸네일 선택
// 상품 상세 페이지에서 사용

'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ProductGallery({ images = [], productName = '' }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [imgError, setImgError] = useState({})

  // 이미지가 없을 경우 플레이스홀더
  const displayImages = images.length > 0
    ? images
    : ['/images/products/placeholder.jpg']

  // 현재 선택된 이미지 로드 실패 여부
  const currentFailed = imgError[selectedIndex]

  return (
    <div className="space-y-4">
      {/* 메인 이미지 */}
      <div className="bg-cream-dark dark:bg-dm-card rounded-card overflow-hidden aspect-square relative">
        {!currentFailed ? (
          <Image
            src={displayImages[selectedIndex]}
            alt={`${productName} 이미지 ${selectedIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            onError={() => setImgError((prev) => ({ ...prev, [selectedIndex]: true }))}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-body text-body text-neutral-300">
              800 x 800
            </span>
          </div>
        )}
      </div>

      {/* 썸네일 목록 (이미지 2개 이상일 때만 표시) */}
      {displayImages.length > 1 && (
        <div className="flex gap-3">
          {displayImages.map((src, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-20 h-20 rounded-xl overflow-hidden relative border-2 transition-all duration-200 ${
                index === selectedIndex
                  ? 'border-gold'
                  : 'border-transparent hover:border-caramel'
              }`}
              aria-label={`${productName} 이미지 ${index + 1}`}
            >
              {!imgError[index] ? (
                <Image
                  src={src}
                  alt={`${productName} 썸네일 ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                  onError={() => setImgError((prev) => ({ ...prev, [index]: true }))}
                />
              ) : (
                <div className="absolute inset-0 bg-cream-dark dark:bg-dm-card flex items-center justify-center">
                  <span className="font-body text-small text-neutral-300">
                    {index + 1}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
