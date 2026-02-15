// 공통 입력 필드 컴포넌트 — 폼 전반에서 일관된 스타일 사용
// label 연결, 에러 메시지 표시 지원

export default function Input({
  label,
  id,
  error,
  className = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block font-body text-caption text-chocolate-light dark:text-neutral-300 mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full h-12 px-4 border rounded-xl font-body text-body text-chocolate dark:text-cream dark:bg-dm-card outline-none transition-all duration-200 ${
          error
            ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
            : 'border-neutral-200 dark:border-dm-border focus:border-caramel focus:ring-2 focus:ring-caramel/20'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 font-body text-small text-error">{error}</p>
      )}
    </div>
  )
}
