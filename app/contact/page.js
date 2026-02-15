// 고객센터/문의 페이지 — 문의 폼, 연락처 정보, 운영 시간
// 'use client' → 폼 입력

'use client'

import { useState } from 'react'
import Link from 'next/link'

// 문의 유형
const inquiryTypes = [
  { value: '', label: '문의 유형을 선택해주세요' },
  { value: 'order', label: '주문/결제 문의' },
  { value: 'delivery', label: '배송 문의' },
  { value: 'product', label: '상품 문의' },
  { value: 'return', label: '교환/환불 문의' },
  { value: 'etc', label: '기타 문의' },
]

// 연락 정보
const contactInfo = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: '전화 문의',
    detail: '02-1234-5678',
    sub: '평일 10:00 ~ 18:00',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: '이메일 문의',
    detail: 'hello@douceur.kr',
    sub: '24시간 접수 가능',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: '방문',
    detail: '서울 성동구 성수이로 123',
    sub: '매일 10:00 ~ 20:00',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    title: '',
    content: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 입력값 변경
  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 문의 제출
  function handleSubmit(e) {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.type || !formData.title || !formData.content) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }

    setIsSubmitting(true)

    // 시뮬레이션: localStorage에 저장
    setTimeout(() => {
      try {
        const inquiries = JSON.parse(localStorage.getItem('douceur_inquiries') || '[]')
        inquiries.push({
          ...formData,
          id: `INQ-${Date.now()}`,
          submittedAt: new Date().toISOString(),
          status: '접수',
        })
        localStorage.setItem('douceur_inquiries', JSON.stringify(inquiries))
      } catch (error) {
        console.error('문의 저장 실패:', error)
      }

      setIsSubmitted(true)
      setIsSubmitting(false)
    }, 500)
  }

  // 제출 완료 상태
  if (isSubmitted) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-card shadow-warm-sm p-8 md:p-12 text-center max-w-md w-full">
          <div className="w-16 h-16 mx-auto mb-6 bg-success/10 rounded-full flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-display text-heading-2 text-chocolate mb-2">
            문의가 접수되었습니다
          </h2>
          <p className="font-body text-body text-neutral-400 mb-8">
            빠른 시일 내에 답변 드리겠습니다.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gold text-white rounded-button px-8 py-3 font-body font-medium hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-12"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">

        {/* 페이지 제목 */}
        <h1 className="font-display text-heading-1 text-chocolate mb-2">
          고객센터
        </h1>
        <p className="font-body text-body text-neutral-400 mb-8">
          궁금하신 점이 있으시면 언제든 문의해주세요
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* 왼쪽: 문의 폼 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-card shadow-warm-sm p-6 md:p-8">
              <h2 className="font-display text-heading-2 text-chocolate mb-6">
                문의하기
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 이름 + 이메일 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactName" className="block font-body text-caption text-chocolate font-medium mb-2">
                      이름 <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="이름"
                      required
                      className="w-full h-12 px-4 border border-neutral-200 rounded-xl font-body text-body text-chocolate focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactEmail" className="block font-body text-caption text-chocolate font-medium mb-2">
                      이메일 <span className="text-error">*</span>
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      required
                      className="w-full h-12 px-4 border border-neutral-200 rounded-xl font-body text-body text-chocolate focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* 연락처 + 문의 유형 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactPhone" className="block font-body text-caption text-chocolate font-medium mb-2">
                      연락처
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="010-0000-0000"
                      className="w-full h-12 px-4 border border-neutral-200 rounded-xl font-body text-body text-chocolate focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactType" className="block font-body text-caption text-chocolate font-medium mb-2">
                      문의 유형 <span className="text-error">*</span>
                    </label>
                    <select
                      id="contactType"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-4 border border-neutral-200 rounded-xl font-body text-body text-chocolate focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200 bg-white"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 제목 */}
                <div>
                  <label htmlFor="contactTitle" className="block font-body text-caption text-chocolate font-medium mb-2">
                    제목 <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactTitle"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="문의 제목을 입력해주세요"
                    required
                    className="w-full h-12 px-4 border border-neutral-200 rounded-xl font-body text-body text-chocolate focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200"
                  />
                </div>

                {/* 내용 */}
                <div>
                  <label htmlFor="contactContent" className="block font-body text-caption text-chocolate font-medium mb-2">
                    문의 내용 <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="contactContent"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="문의 내용을 자세히 작성해주세요"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-body text-chocolate focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200 resize-none"
                  />
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gold text-white rounded-button px-8 py-3 font-body font-medium text-body hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-12 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? '접수 중...' : '문의 접수하기'}
                </button>
              </form>
            </div>
          </div>

          {/* 오른쪽: 연락처 정보 */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((info) => (
              <div key={info.title} className="bg-white rounded-card shadow-warm-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-caramel flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-body text-body text-chocolate font-medium mb-1">
                      {info.title}
                    </h3>
                    <p className="font-body text-caption text-chocolate-light">
                      {info.detail}
                    </p>
                    <p className="font-body text-small text-neutral-400 mt-1">
                      {info.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* FAQ 링크 */}
            <div className="bg-cream-dark rounded-card p-6 text-center">
              <p className="font-body text-caption text-chocolate-light mb-3">
                자주 묻는 질문을 먼저 확인해보세요
              </p>
              <Link
                href="/notice"
                className="inline-flex items-center gap-2 border border-caramel text-chocolate-light rounded-button px-6 py-2.5 font-body font-medium text-caption hover:bg-caramel hover:text-white transition-all duration-300 h-10"
              >
                FAQ 바로가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
