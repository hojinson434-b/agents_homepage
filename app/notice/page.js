// 공지사항/FAQ 페이지 — 탭으로 공지사항 + FAQ 아코디언 전환
// 'use client' → 탭 전환, 아코디언 토글

'use client'

import { useState } from 'react'

// 공지사항 데이터
const notices = [
  {
    id: 1,
    title: '2025년 설날 배송 안내',
    date: '2025-01-15',
    category: '배송',
    content: '설 연휴 기간(1/25~1/29) 동안 배송이 일시 중단됩니다. 1/24(금) 오전 10시까지 주문 건에 한해 연휴 전 배송됩니다. 연휴 이후 주문 건은 1/30(목)부터 순차 발송됩니다.',
  },
  {
    id: 2,
    title: '신메뉴 출시 — 크렘 브륄레 & 말차 롤케이크',
    date: '2024-12-20',
    category: '신메뉴',
    content: '프렌치 정통 크렘 브륄레와 교토 우지 말차 롤케이크가 새롭게 출시되었습니다. 출시 기념 10% 할인 이벤트를 진행 중이니 놓치지 마세요!',
  },
  {
    id: 3,
    title: '겨울 시즌 한정 메뉴 안내',
    date: '2024-12-01',
    category: '이벤트',
    content: '따뜻한 겨울을 위한 시즌 한정 메뉴를 준비했습니다. 핫초콜릿 세트, 시나몬 쿠키, 크리스마스 선물세트 등 다양한 제품을 만나보세요.',
  },
  {
    id: 4,
    title: '배송비 정책 변경 안내 (3만원 이상 무료배송)',
    date: '2024-11-15',
    category: '배송',
    content: '고객님들의 성원에 보답하고자 무료배송 기준을 5만원에서 3만원으로 변경합니다. 3만원 이상 구매 시 무료배송으로 더 합리적인 쇼핑을 즐기세요.',
  },
  {
    id: 5,
    title: '개인정보 처리방침 개정 안내',
    date: '2024-10-01',
    category: '안내',
    content: '개인정보 보호법 개정에 따라 당사의 개인정보 처리방침이 일부 개정되었습니다. 자세한 내용은 홈페이지 하단의 개인정보 처리방침 페이지를 참고해주세요.',
  },
]

// FAQ 데이터
const faqs = [
  {
    category: '주문/결제',
    items: [
      {
        question: '주문 후 변경/취소가 가능한가요?',
        answer: '제조 시작 전(주문 후 2시간 이내)에는 변경 및 취소가 가능합니다. 마이페이지 > 주문 내역에서 취소 요청을 해주시거나, 고객센터로 연락주세요.',
      },
      {
        question: '어떤 결제 수단을 이용할 수 있나요?',
        answer: '신용/체크카드, 무통장입금, 카카오페이, 네이버페이를 지원합니다. 모든 결제는 안전하게 처리됩니다.',
      },
      {
        question: '영수증 발급이 가능한가요?',
        answer: '카드 결제의 경우 카드사 영수증이 자동 발급됩니다. 현금영수증이나 세금계산서 발급이 필요하신 경우 고객센터로 문의해주세요.',
      },
    ],
  },
  {
    category: '배송',
    items: [
      {
        question: '배송은 얼마나 걸리나요?',
        answer: '서울/경기 지역은 주문 다음 날 도착(오전 10시 이전 주문 기준), 그 외 지역은 2~3일 소요됩니다. 냉장/냉동 상품은 아이스박스로 안전하게 배송됩니다.',
      },
      {
        question: '배송비는 얼마인가요?',
        answer: '3만원 이상 구매 시 무료배송입니다. 3만원 미만 주문 시 배송비 3,000원이 부과됩니다.',
      },
      {
        question: '특정 날짜에 수령하고 싶어요.',
        answer: '주문 시 배송 메모에 원하시는 수령 날짜를 기입해주세요. 가능한 한 맞춰드리겠습니다. 단, 생산 상황에 따라 조정될 수 있으니 여유를 두고 주문해주세요.',
      },
    ],
  },
  {
    category: '상품',
    items: [
      {
        question: '알레르기 정보는 어디서 확인하나요?',
        answer: '각 상품 상세 페이지 하단에 알레르기 유발 물질 정보가 표시되어 있습니다. 추가 문의 사항이 있으시면 고객센터로 연락주세요.',
      },
      {
        question: '유통기한은 어떻게 되나요?',
        answer: '상품별로 다르며, 상품 상세 페이지에 표시되어 있습니다. 생크림 케이크는 3일, 쿠키류는 7~14일, 마카롱은 7일입니다. 수령 후 가능한 빨리 드시는 것을 권장합니다.',
      },
      {
        question: '케이크에 메시지를 넣을 수 있나요?',
        answer: '네, 주문 시 배송 메모에 원하시는 메시지를 적어주시면 케이크 위에 초콜릿 플레이트로 작성해드립니다. 15자 이내로 부탁드립니다.',
      },
    ],
  },
  {
    category: '교환/환불',
    items: [
      {
        question: '교환/환불이 가능한가요?',
        answer: '식품 특성상 단순 변심에 의한 교환/환불은 어렵습니다. 단, 제품 하자(파손, 변질 등)의 경우 수령 후 24시간 이내에 사진과 함께 고객센터로 접수해주시면 교환 또는 환불 처리해드립니다.',
      },
      {
        question: '제품이 파손되어 도착했어요.',
        answer: '배송 중 파손이 발생한 경우, 제품 사진과 함께 고객센터(02-1234-5678)로 연락주세요. 확인 후 즉시 재발송 또는 환불 처리해드립니다.',
      },
    ],
  },
]

// 카테고리 뱃지 색상
const categoryColors = {
  '배송': 'bg-info/10 text-info',
  '신메뉴': 'bg-success/10 text-success',
  '이벤트': 'bg-gold/10 text-gold',
  '안내': 'bg-neutral-100 text-neutral-500',
}

export default function NoticePage() {
  const [activeTab, setActiveTab] = useState('notice')
  const [openFaq, setOpenFaq] = useState(null)
  const [expandedNotice, setExpandedNotice] = useState(null)

  // FAQ 토글
  function toggleFaq(key) {
    setOpenFaq((prev) => (prev === key ? null : key))
  }

  return (
    <div className="bg-cream dark:bg-dm-bg min-h-screen">
      <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">

        {/* 페이지 제목 */}
        <h1 className="font-display text-heading-1 text-chocolate dark:text-cream mb-2">
          공지사항 & FAQ
        </h1>
        <p className="font-body text-body text-neutral-400 mb-8">
          Douceur의 소식과 자주 묻는 질문을 확인하세요
        </p>

        {/* 탭 */}
        <div className="flex gap-1 mb-8 border-b border-neutral-200 dark:border-dm-border">
          <button
            onClick={() => setActiveTab('notice')}
            className={`px-5 py-3 font-body text-caption font-medium transition-all duration-200 border-b-2 -mb-px ${
              activeTab === 'notice'
                ? 'text-gold border-gold'
                : 'text-neutral-400 border-transparent hover:text-chocolate-light dark:text-neutral-300'
            }`}
          >
            공지사항
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-5 py-3 font-body text-caption font-medium transition-all duration-200 border-b-2 -mb-px ${
              activeTab === 'faq'
                ? 'text-gold border-gold'
                : 'text-neutral-400 border-transparent hover:text-chocolate-light dark:text-neutral-300'
            }`}
          >
            자주 묻는 질문
          </button>
        </div>

        {/* 공지사항 탭 */}
        {activeTab === 'notice' && (
          <div className="space-y-3">
            {notices.map((notice) => (
              <div key={notice.id} className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm overflow-hidden">
                <button
                  onClick={() => setExpandedNotice((prev) => prev === notice.id ? null : notice.id)}
                  className="w-full px-6 py-4 text-left flex items-center gap-4"
                >
                  {/* 카테고리 뱃지 */}
                  <span className={`flex-shrink-0 font-body text-small font-medium px-2.5 py-0.5 rounded-button ${categoryColors[notice.category] || 'bg-neutral-100 text-neutral-500'}`}>
                    {notice.category}
                  </span>

                  {/* 제목 */}
                  <span className="flex-1 font-body text-body text-chocolate dark:text-cream font-medium truncate">
                    {notice.title}
                  </span>

                  {/* 날짜 */}
                  <span className="flex-shrink-0 font-body text-small text-neutral-400 hidden md:block">
                    {notice.date}
                  </span>

                  {/* 화살표 */}
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className={`flex-shrink-0 text-neutral-300 transition-transform duration-200 ${expandedNotice === notice.id ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* 내용 (확장) */}
                {expandedNotice === notice.id && (
                  <div className="px-6 pb-4 border-t border-neutral-100">
                    <p className="font-body text-caption text-neutral-400 mt-3 md:hidden mb-2">
                      {notice.date}
                    </p>
                    <p className="font-body text-body text-chocolate-light dark:text-neutral-300 leading-relaxed mt-2">
                      {notice.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* FAQ 탭 */}
        {activeTab === 'faq' && (
          <div className="space-y-8">
            {faqs.map((section) => (
              <div key={section.category}>
                <h3 className="font-display text-heading-3 text-chocolate dark:text-cream mb-4">
                  {section.category}
                </h3>

                <div className="space-y-2">
                  {section.items.map((faq, index) => {
                    const key = `${section.category}-${index}`
                    const isOpen = openFaq === key

                    return (
                      <div key={key} className="bg-white dark:bg-dm-surface rounded-card shadow-warm-sm overflow-hidden">
                        {/* 질문 */}
                        <button
                          onClick={() => toggleFaq(key)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                        >
                          <span className="font-body text-body text-chocolate dark:text-cream font-medium">
                            Q. {faq.question}
                          </span>
                          <svg
                            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className={`flex-shrink-0 text-neutral-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>

                        {/* 답변 */}
                        {isOpen && (
                          <div className="px-6 pb-4 border-t border-neutral-100">
                            <p className="font-body text-body text-chocolate-light dark:text-neutral-300 leading-relaxed mt-3">
                              A. {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
