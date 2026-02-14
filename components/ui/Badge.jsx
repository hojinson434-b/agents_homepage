// 배지 컴포넌트 — 상품 태그 (BEST, NEW, SALE 등) 표시용

export default function Badge({
  children,
  variant = 'default',
  className = '',
}) {
  const baseStyles = 'inline-block font-body text-small font-medium px-3 py-1 rounded-button'

  const variants = {
    default: 'bg-gold text-white',
    new: 'bg-caramel text-white',
    sale: 'bg-error text-white',
    best: 'bg-chocolate text-white',
    info: 'bg-info text-white',
  }

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
