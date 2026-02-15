// 브랜드 소개 페이지 — Douceur 브랜드 스토리, 철학, 팀 소개

import Link from 'next/link'

// 브랜드 가치
const values = [
  {
    title: '최상의 재료',
    description: '프랑스, 벨기에, 일본 등 세계 각지에서 엄선한 최고급 원재료만을 사용합니다.',
    icon: '🌾',
  },
  {
    title: '장인의 손길',
    description: '10년 이상 경력의 파티시에가 하나하나 정성을 담아 수제로 만듭니다.',
    icon: '👨‍🍳',
  },
  {
    title: '매일 신선하게',
    description: '당일 제조, 당일 배송을 원칙으로 가장 신선한 디저트를 전해드립니다.',
    icon: '🌿',
  },
  {
    title: '지속 가능한 미식',
    description: '친환경 포장재 사용과 로컬 농가와의 협업으로 지속 가능한 미식을 추구합니다.',
    icon: '🌍',
  },
]

// 연혁
const milestones = [
  { year: '2017', event: '서울 성수동에 첫 번째 아틀리에 오픈' },
  { year: '2018', event: '시그니처 마카롱 라인 출시, 월 판매 1,000개 돌파' },
  { year: '2019', event: '온라인 쇼핑몰 "Douceur" 런칭' },
  { year: '2020', event: '전국 택배 배송 서비스 시작' },
  { year: '2021', event: '프리미엄 선물세트 라인 출시, 기업 납품 시작' },
  { year: '2022', event: '강남 플래그십 스토어 오픈' },
  { year: '2023', event: '누적 고객 5,000명 돌파, 제품 라인 30종 확장' },
  { year: '2024', event: '해외 원재료 직수입 시스템 구축' },
]

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">

      {/* 히어로 섹션 */}
      <section className="bg-chocolate text-white py-20 md:py-28">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="font-accent text-caption text-caramel tracking-widest uppercase mb-4">
            About Douceur
          </p>
          <h1 className="font-display text-hero-mobile lg:text-hero-desktop text-white mb-6">
            달콤함으로 전하는
            <br />
            진심의 이야기
          </h1>
          <p className="font-body text-body-lg text-neutral-200 max-w-xl mx-auto leading-relaxed">
            Douceur는 프랑스어로 &ldquo;달콤함&rdquo;이라는 뜻입니다.
            우리는 한 입의 디저트로 당신의 하루에 달콤한 위로를 전합니다.
          </p>
        </div>
      </section>

      {/* 브랜드 스토리 */}
      <section className="py-16 md:py-24">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 이미지 */}
            <div className="bg-cream-dark rounded-card h-80 lg:h-96 flex items-center justify-center">
              <span className="font-body text-body text-neutral-300">800 x 600</span>
            </div>

            {/* 텍스트 */}
            <div>
              <p className="font-accent text-caption text-caramel tracking-widest uppercase mb-3">
                Our Story
              </p>
              <h2 className="font-display text-heading-1 text-chocolate mb-6">
                파리의 감성을 서울에서
              </h2>
              <div className="space-y-4 font-body text-body text-chocolate-light leading-relaxed">
                <p>
                  2017년, 파리에서 수년간 파티스리를 배운 셰프가 서울 성수동의 작은 공방에서 시작한 Douceur.
                  &ldquo;진짜 좋은 재료로, 진심을 담아 만들자&rdquo;는 단순하지만 확고한 철학으로 출발했습니다.
                </p>
                <p>
                  프랑스 전통 제법을 바탕으로 한국의 계절과 입맛에 맞춘 디저트를 만들며,
                  매일 아침 신선한 재료로 소량만 제조합니다. 대량 생산이 아닌 장인의 손길이 닿는
                  수제 디저트, 그것이 Douceur의 자부심입니다.
                </p>
                <p>
                  이제 온라인을 통해 전국 어디서든 Douceur의 달콤함을 만나실 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 브랜드 가치 */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-accent text-caption text-caramel tracking-widest uppercase mb-3">
              Our Values
            </p>
            <h2 className="font-display text-heading-1 text-chocolate">
              네 가지 약속
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-cream rounded-card p-6 text-center hover:shadow-warm-hover hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-hero-mobile block mb-4">{value.icon}</span>
                <h3 className="font-display text-heading-3 text-chocolate mb-3">
                  {value.title}
                </h3>
                <p className="font-body text-caption text-chocolate-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연혁 */}
      <section className="py-16 md:py-24">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-accent text-caption text-caramel tracking-widest uppercase mb-3">
              Milestones
            </p>
            <h2 className="font-display text-heading-1 text-chocolate">
              Douceur의 발자취
            </h2>
          </div>

          <div className="space-y-0">
            {milestones.map((item, index) => (
              <div
                key={item.year}
                className="flex items-start gap-6 py-4 border-b border-neutral-100 last:border-b-0"
              >
                <span className="font-accent text-heading-3 text-gold font-medium w-16 flex-shrink-0">
                  {item.year}
                </span>
                <p className="font-body text-body text-chocolate-light">
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-chocolate py-16 md:py-20">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="font-display text-heading-1 text-white mb-4">
            달콤한 경험을 시작하세요
          </h2>
          <p className="font-body text-body text-neutral-200 mb-8">
            Douceur의 프리미엄 디저트를 지금 만나보세요
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gold text-white rounded-button px-8 py-3 font-body font-medium hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-12"
          >
            상품 둘러보기
          </Link>
        </div>
      </section>
    </div>
  )
}
