// 범용 카드 컴포넌트 — 상품 카드, 콘텐츠 카드 등에 사용
// hover 시 그림자 확대 + 살짝 올라가는 효과 지원

export default function Card({
  children,
  hover = true,
  className = '',
  ...props
}) {
  const baseStyles = 'bg-white rounded-card shadow-warm-sm overflow-hidden'
  const hoverStyles = hover
    ? 'hover:shadow-warm-hover hover:-translate-y-1 transition-all duration-300'
    : ''

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
