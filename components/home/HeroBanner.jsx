// 히어로 배너 슬라이드 컴포넌트 — 메인 페이지 최상단
// 자동 슬라이드 (5초 간격) + 수동 인디케이터 지원

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { heroSlides } from '@/lib/products'

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)

  // 자동 슬라이드 (5초 간격)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = heroSlides[current]

  return (
    <section className={`${slide.bgColor} transition-colors duration-700`}>
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center py-20 md:py-28 lg:py-36 min-h-[400px] md:min-h-[500px]">

          {/* 메인 타이틀 */}
          <h1
            key={slide.id}
            className="font-display text-hero-mobile lg:text-hero-desktop text-chocolate dark:text-cream whitespace-pre-line animate-fade-in-up"
          >
            {slide.title}
          </h1>

          {/* 서브 타이틀 */}
          <p className="font-body text-body-lg text-chocolate-light dark:text-neutral-300 mt-4 md:mt-6 max-w-content animate-fade-in">
            {slide.subtitle}
          </p>

          {/* CTA 버튼 */}
          <Link
            href={slide.buttonLink}
            className="mt-8 md:mt-10 bg-gold text-white rounded-button px-8 py-3 font-body font-medium text-body hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-12 inline-flex items-center"
          >
            {slide.buttonText}
          </Link>

          {/* 슬라이드 인디케이터 */}
          <div className="flex items-center gap-3 mt-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-button transition-all duration-300 ${
                  index === current
                    ? 'bg-gold w-8'
                    : 'bg-neutral-300 hover:bg-caramel'
                }`}
                aria-label={`슬라이드 ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
