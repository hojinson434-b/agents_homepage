// 공통 유틸리티 함수

// 가격을 한국 원화 형식으로 포맷 (예: 38000 → "38,000")
export function formatPrice(price) {
  return price.toLocaleString('ko-KR')
}

// 별점을 별 문자열로 변환 (예: 4.5 → "★★★★☆")
export function renderStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  return '★'.repeat(fullStars) + (hasHalf ? '☆' : '') + '☆'.repeat(emptyStars)
}
