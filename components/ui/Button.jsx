// 공통 버튼 컴포넌트 — Primary, Secondary, Ghost 변형 지원
// 모든 페이지에서 일관된 버튼 스타일을 위해 사용

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-body font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-caramel/20'

  const variants = {
    primary: 'bg-gold text-white rounded-button hover:scale-[1.02] hover:shadow-warm-md',
    secondary: 'border border-caramel text-chocolate-light dark:text-neutral-300 rounded-button hover:bg-caramel hover:text-white',
    ghost: 'text-caramel hover:text-gold',
  }

  const sizes = {
    sm: 'px-5 py-2 text-caption',
    md: 'px-8 py-3 text-body h-12',
    lg: 'px-10 py-4 text-body-lg h-14',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
