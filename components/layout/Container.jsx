// 레이아웃 컨테이너 래퍼 — 최대 너비 + 좌우 패딩 일관성 유지
// 모든 페이지 콘텐츠를 감싸는 용도

export default function Container({
  children,
  size = 'wide',
  className = '',
}) {
  const sizes = {
    content: 'max-w-content',
    wide: 'max-w-wide',
  }

  return (
    <div className={`${sizes[size]} mx-auto px-4 md:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
