// 회원가입 페이지 — 이름, 이메일, 비밀번호, 비밀번호 확인
// 'use client' → 폼 입력, useAuth

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function SignupPage() {
  const router = useRouter()
  const { signup, isLoggedIn } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  })
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
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (serverError) setServerError('')
  }

  // 유효성 검증
  function validate() {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '이름은 2자 이상 입력해주세요.'
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.'
    }

    if (formData.phone && !/^01[016789]-?\d{3,4}-?\d{4}$/.test(formData.phone.replace(/-/g, '').replace(/^01/, '01'))) {
      // 전화번호는 선택사항이므로 입력했을 때만 검증
      if (!/^\d{10,11}$/.test(formData.phone.replace(/-/g, ''))) {
        newErrors.phone = '올바른 연락처를 입력해주세요.'
      }
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.'
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상 입력해주세요.'
    }

    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호 확인을 입력해주세요.'
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 회원가입 처리
  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setServerError('')

    setTimeout(() => {
      const result = signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
      })

      if (result.success) {
        router.push('/mypage')
      } else {
        setServerError(result.message)
        setIsSubmitting(false)
      }
    }, 300)
  }

  return (
    <div className="bg-cream dark:bg-dm-bg min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="font-display text-hero-mobile text-chocolate dark:text-cream">
              Douceur
            </h1>
          </Link>
          <p className="font-body text-body text-neutral-400 mt-2">
            달콤한 세계에 합류하세요
          </p>
        </div>

        {/* 회원가입 폼 */}
        <div className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm p-8">
          <h2 className="font-display text-heading-2 text-chocolate dark:text-cream text-center mb-6">
            회원가입
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
            {/* 이름 */}
            <div>
              <label htmlFor="name" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
                이름 <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력해주세요"
                className={`w-full h-12 px-4 border rounded-xl font-body text-body text-chocolate dark:border-dm-border dark:bg-dm-card dark:text-cream outline-none transition-all duration-200 ${
                  errors.name
                    ? 'border-error focus:ring-2 focus:ring-error/20'
                    : 'border-neutral-200 dark:border-dm-border focus:border-caramel focus:ring-2 focus:ring-caramel/20'
                }`}
              />
              {errors.name && (
                <p className="mt-1 font-body text-small text-error">{errors.name}</p>
              )}
            </div>

            {/* 이메일 */}
            <div>
              <label htmlFor="email" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
                이메일 <span className="text-error">*</span>
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

            {/* 연락처 (선택) */}
            <div>
              <label htmlFor="phone" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
                연락처 <span className="font-body text-small text-neutral-300 dark:text-neutral-300">(선택)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="010-0000-0000"
                className={`w-full h-12 px-4 border rounded-xl font-body text-body text-chocolate dark:border-dm-border dark:bg-dm-card dark:text-cream outline-none transition-all duration-200 ${
                  errors.phone
                    ? 'border-error focus:ring-2 focus:ring-error/20'
                    : 'border-neutral-200 dark:border-dm-border focus:border-caramel focus:ring-2 focus:ring-caramel/20'
                }`}
              />
              {errors.phone && (
                <p className="mt-1 font-body text-small text-error">{errors.phone}</p>
              )}
            </div>

            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
                비밀번호 <span className="text-error">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="6자 이상 입력해주세요"
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

            {/* 비밀번호 확인 */}
            <div>
              <label htmlFor="passwordConfirm" className="block font-body text-caption text-chocolate dark:text-cream font-medium mb-2">
                비밀번호 확인 <span className="text-error">*</span>
              </label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력해주세요"
                className={`w-full h-12 px-4 border rounded-xl font-body text-body text-chocolate dark:border-dm-border dark:bg-dm-card dark:text-cream outline-none transition-all duration-200 ${
                  errors.passwordConfirm
                    ? 'border-error focus:ring-2 focus:ring-error/20'
                    : 'border-neutral-200 dark:border-dm-border focus:border-caramel focus:ring-2 focus:ring-caramel/20'
                }`}
              />
              {errors.passwordConfirm && (
                <p className="mt-1 font-body text-small text-error">{errors.passwordConfirm}</p>
              )}
            </div>

            {/* 가입 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold text-white rounded-button py-3 font-body font-medium text-body hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-14 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
            >
              {isSubmitting ? '가입 처리 중...' : '회원가입'}
            </button>
          </form>

          {/* 구분선 */}
          <div className="flex items-center gap-4 my-6">
            <hr className="flex-1 border-neutral-200 dark:border-dm-border" />
            <span className="font-body text-small text-neutral-300 dark:text-neutral-300">또는</span>
            <hr className="flex-1 border-neutral-200 dark:border-dm-border" />
          </div>

          {/* 로그인 링크 */}
          <p className="text-center font-body text-caption text-neutral-400">
            이미 회원이신가요?{' '}
            <Link
              href="/auth/login"
              className="text-gold font-medium hover:underline"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
