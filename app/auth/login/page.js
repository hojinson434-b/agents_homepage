// 로그인 페이지 — 이메일/비밀번호 입력, 유효성 검증
// 'use client' → 폼 입력, useAuth

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoggedIn } = useAuth()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 이미 로그인된 경우 마이페이지로
  if (isLoggedIn) {
    router.push('/mypage')
    return null
  }

  // 입력값 변경
  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // 입력 시 에러 초기화
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (serverError) setServerError('')
  }

  // 유효성 검증
  function validate() {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.'
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 로그인 처리
  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setServerError('')

    // 시뮬레이션 지연
    setTimeout(() => {
      const result = login(formData.email, formData.password)

      if (result.success) {
        router.push('/mypage')
      } else {
        setServerError(result.message)
        setIsSubmitting(false)
      }
    }, 300)
  }

  return (
    <div className="bg-cream dark:bg-dm-bg min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="font-display text-hero-mobile text-chocolate dark:text-cream">
              Douceur
            </h1>
          </Link>
          <p className="font-body text-body text-neutral-400 mt-2">
            달콤한 순간에 오신 것을 환영합니다
          </p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm p-8">
          <h2 className="font-display text-heading-2 text-chocolate dark:text-cream text-center mb-6">
            로그인
          </h2>

          {/* 서버 에러 메시지 */}
          {serverError && (
            <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-xl">
              <p className="font-body text-caption text-error text-center">
                {serverError}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 이메일 */}
            <div>
              <label htmlFor="email" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className={`w-full h-12 px-4 border rounded-xl font-body text-body text-chocolate dark:border-dm-border dark:bg-dm-card dark:text-cream outline-none transition-all duration-200 ${
                  errors.email
                    ? 'border-error focus:ring-2 focus:ring-error/20'
                    : 'border-neutral-200 dark:border-dm-border focus:border-caramel focus:ring-2 focus:ring-caramel/20'
                }`}
              />
              {errors.email && (
                <p className="mt-1 font-body text-small text-error">{errors.email}</p>
              )}
            </div>

            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력해주세요"
                className={`w-full h-12 px-4 border rounded-xl font-body text-body text-chocolate dark:border-dm-border dark:bg-dm-card dark:text-cream outline-none transition-all duration-200 ${
                  errors.password
                    ? 'border-error focus:ring-2 focus:ring-error/20'
                    : 'border-neutral-200 dark:border-dm-border focus:border-caramel focus:ring-2 focus:ring-caramel/20'
                }`}
              />
              {errors.password && (
                <p className="mt-1 font-body text-small text-error">{errors.password}</p>
              )}
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold text-white rounded-button py-3 font-body font-medium text-body hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-14 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? '로그인 중...' : '로그인'}
            </button>
          </form>

          {/* 구분선 */}
          <div className="flex items-center gap-4 my-6">
            <hr className="flex-1 border-neutral-200 dark:border-dm-border" />
            <span className="font-body text-small text-neutral-300 dark:text-neutral-300">또는</span>
            <hr className="flex-1 border-neutral-200 dark:border-dm-border" />
          </div>

          {/* 회원가입 링크 */}
          <p className="text-center font-body text-caption text-neutral-400">
            아직 회원이 아니신가요?{' '}
            <Link
              href="/auth/signup"
              className="text-gold font-medium hover:underline"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
