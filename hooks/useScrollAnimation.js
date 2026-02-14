// 스크롤 애니메이션 커스텀 훅 — Intersection Observer 기반
// 요소가 뷰포트에 진입하면 애니메이션 클래스를 적용

'use client'

import { useEffect, useRef, useState } from 'react'

export default function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 한번 보이면 계속 보이는 상태 유지
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return { ref, isVisible }
}
