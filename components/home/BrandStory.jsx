// 브랜드 스토리 미니 섹션 — 메인 페이지 중간에 브랜드 가치 전달
// 파티시에 이미지 + 통계 카드 구성

import Image from 'next/image'
import Link from 'next/link'

export default function BrandStory() {
  return (
    <section className="py-16 md:py-24 bg-chocolate text-white overflow-hidden">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* 텍스트 영역 */}
          <div>
            <p className="font-accent text-caption text-gold font-medium tracking-wider mb-3">
              OUR STORY
            </p>
            <h2 className="font-display text-heading-1 lg:text-hero-mobile text-white mb-6">
              매일 아침,{' '}
              <span className="text-gold">정성</span>을 굽습니다
            </h2>
            <p className="font-body text-body text-neutral-300 leading-relaxed mb-4">
              Douceur는 프랑스어로 &quot;달콤함&quot;을 뜻합니다.
              파리 르 코르동 블루 출신 파티시에가 매일 새벽부터
              최상의 재료로 하나하나 정성스럽게 만듭니다.
            </p>
            <p className="font-body text-body text-neutral-300 leading-relaxed mb-8">
              프랑스 AOP 인증 버터, 벨기에 칼리바우트 초콜릿,
              마다가스카르 바닐라 빈 — 타협 없는 재료 선택이
              Douceur의 약속입니다.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-gold text-gold rounded-button px-8 py-3 font-body font-medium hover:bg-gold hover:text-white transition-all duration-300 h-12"
            >
              브랜드 스토리 보기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>

          {/* 이미지 + 통계 영역 */}
          <div className="space-y-6">
            {/* 파티시에 이미지 */}
            <div className="relative rounded-card overflow-hidden h-64 lg:h-72">
              <Image
                src="/images/brand-atelier.jpg"
                alt="Douceur 파티시에가 케이크를 데코레이션하는 모습"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-chocolate-light dark:bg-dm-card rounded-card p-5 text-center">
                <p className="font-display text-heading-1 text-gold">7+</p>
                <p className="font-body text-caption text-neutral-300 mt-1">년의 경험</p>
              </div>
              <div className="bg-chocolate-light dark:bg-dm-card rounded-card p-5 text-center">
                <p className="font-display text-heading-1 text-gold">30+</p>
                <p className="font-body text-caption text-neutral-300 mt-1">종의 메뉴</p>
              </div>
              <div className="bg-chocolate-light dark:bg-dm-card rounded-card p-5 text-center">
                <p className="font-display text-heading-1 text-gold">5k+</p>
                <p className="font-body text-caption text-neutral-300 mt-1">만족한 고객</p>
              </div>
              <div className="bg-chocolate-light dark:bg-dm-card rounded-card p-5 text-center">
                <p className="font-display text-heading-1 text-gold">4.8</p>
                <p className="font-body text-caption text-neutral-300 mt-1">평균 별점</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
