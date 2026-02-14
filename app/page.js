// 테마 확인용 홈페이지 — Phase 0 디자인 시스템 검증

export default function Home() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-12">

        {/* 헤더 */}
        <header className="text-center mb-16">
          <h1 className="font-display text-hero-mobile lg:text-hero-desktop text-chocolate mb-4">
            Douceur
          </h1>
          <p className="font-body text-body-lg text-chocolate-light">
            파리 파티스리의 우아함을 담은 프리미엄 디저트 쇼핑몰
          </p>
          <p className="font-accent text-caption text-neutral-400 mt-2">
            Patisserie Moderne — Since 2024
          </p>
        </header>

        {/* 컬러 팔레트 */}
        <section className="mb-16">
          <h2 className="font-display text-heading-1 text-chocolate mb-8">
            컬러 팔레트
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <ColorSwatch name="Cream" className="bg-cream border border-neutral-200" />
            <ColorSwatch name="Cream Dark" className="bg-cream-dark border border-neutral-200" />
            <ColorSwatch name="Chocolate" className="bg-chocolate" textLight />
            <ColorSwatch name="Chocolate Light" className="bg-chocolate-light" textLight />
            <ColorSwatch name="Caramel" className="bg-caramel" textLight />
            <ColorSwatch name="Gold" className="bg-gold" textLight />
            <ColorSwatch name="Rose" className="bg-rose" />
            <ColorSwatch name="Success" className="bg-success" textLight />
            <ColorSwatch name="Error" className="bg-error" textLight />
            <ColorSwatch name="Warning" className="bg-warning" />
            <ColorSwatch name="Info" className="bg-info" textLight />
            <ColorSwatch name="Neutral 100" className="bg-neutral-100" />
            <ColorSwatch name="Neutral 200" className="bg-neutral-200" />
            <ColorSwatch name="Neutral 300" className="bg-neutral-300" />
            <ColorSwatch name="Neutral 400" className="bg-neutral-400" textLight />
            <ColorSwatch name="Neutral 500" className="bg-neutral-500" textLight />
          </div>
        </section>

        {/* 타이포그래피 */}
        <section className="mb-16">
          <h2 className="font-display text-heading-1 text-chocolate mb-8">
            타이포그래피
          </h2>
          <div className="space-y-6 bg-white rounded-card shadow-warm-sm p-8">
            <div>
              <p className="font-body text-caption text-neutral-400 mb-1">font-display / text-heading-1</p>
              <p className="font-display text-heading-1 text-chocolate">Playfair Display 제목 서체</p>
            </div>
            <div>
              <p className="font-body text-caption text-neutral-400 mb-1">font-body / text-body</p>
              <p className="font-body text-body text-chocolate-light">Noto Sans KR 본문 서체 — 가독성 높은 한국어 폰트입니다.</p>
            </div>
            <div>
              <p className="font-body text-caption text-neutral-400 mb-1">font-accent / text-body</p>
              <p className="font-accent text-body text-chocolate-light">DM Sans — Clean and modern accent font for English text.</p>
            </div>
            <hr className="border-neutral-200" />
            <div className="space-y-2">
              <p className="font-display text-hero-mobile text-chocolate">Hero Mobile (2.5rem)</p>
              <p className="font-display text-heading-1 text-chocolate">Heading 1 (2rem)</p>
              <p className="font-display text-heading-2 text-chocolate">Heading 2 (1.5rem)</p>
              <p className="font-display text-heading-3 text-chocolate">Heading 3 (1.25rem)</p>
              <p className="font-body text-body-lg text-chocolate-light">Body Large (1.125rem)</p>
              <p className="font-body text-body text-chocolate-light">Body (1rem)</p>
              <p className="font-body text-caption text-neutral-400">Caption (0.875rem)</p>
              <p className="font-body text-small text-neutral-400">Small (0.75rem)</p>
            </div>
          </div>
        </section>

        {/* 버튼 */}
        <section className="mb-16">
          <h2 className="font-display text-heading-1 text-chocolate mb-8">
            버튼
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <button className="bg-gold text-white rounded-button px-8 py-3 font-body font-medium hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300">
              Primary 버튼
            </button>
            <button className="border border-caramel text-chocolate-light rounded-button px-8 py-3 font-body font-medium hover:bg-caramel hover:text-white transition-all duration-300">
              Secondary 버튼
            </button>
            <button className="text-caramel font-body font-medium px-8 py-3 hover:text-gold transition-all duration-300">
              Ghost 버튼
            </button>
          </div>
        </section>

        {/* 카드 */}
        <section className="mb-16">
          <h2 className="font-display text-heading-1 text-chocolate mb-8">
            상품 카드
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCardDemo
              name="딸기 생크림 케이크"
              price="38,000"
              badge="BEST"
            />
            <ProductCardDemo
              name="얼그레이 마카롱 세트"
              price="24,000"
              badge="NEW"
            />
            <ProductCardDemo
              name="다크 초콜릿 브라우니"
              price="18,000"
              badge={null}
            />
          </div>
        </section>

        {/* 그림자 */}
        <section className="mb-16">
          <h2 className="font-display text-heading-1 text-chocolate mb-8">
            그림자
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="bg-white rounded-card p-6 shadow-warm-sm text-center">
              <p className="font-body text-caption text-neutral-400">warm-sm</p>
            </div>
            <div className="bg-white rounded-card p-6 shadow-warm-md text-center">
              <p className="font-body text-caption text-neutral-400">warm-md</p>
            </div>
            <div className="bg-white rounded-card p-6 shadow-warm-lg text-center">
              <p className="font-body text-caption text-neutral-400">warm-lg</p>
            </div>
            <div className="bg-white rounded-card p-6 shadow-warm-xl text-center">
              <p className="font-body text-caption text-neutral-400">warm-xl</p>
            </div>
            <div className="bg-white rounded-card p-6 shadow-warm-hover text-center">
              <p className="font-body text-caption text-neutral-400">warm-hover</p>
            </div>
          </div>
        </section>

        {/* 입력 필드 */}
        <section className="mb-16">
          <h2 className="font-display text-heading-1 text-chocolate mb-8">
            입력 필드
          </h2>
          <div className="max-w-content space-y-4">
            <input
              type="text"
              placeholder="이름을 입력하세요"
              className="w-full h-12 px-4 border border-neutral-200 rounded-xl font-body text-body text-chocolate focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200"
            />
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full h-12 px-4 border border-neutral-200 rounded-xl font-body text-body text-chocolate focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all duration-200"
            />
          </div>
        </section>

        {/* 푸터 */}
        <footer className="text-center py-8 border-t border-neutral-200">
          <p className="font-body text-caption text-neutral-400">
            Phase 0 — 디자인 시스템 검증 완료
          </p>
        </footer>
      </div>
    </div>
  )
}

/* ── 컬러 스워치 컴포넌트 ── */
function ColorSwatch({ name, className, textLight = false }) {
  return (
    <div className={`rounded-card p-4 h-24 flex items-end ${className}`}>
      <span className={`font-body text-small font-medium ${textLight ? 'text-white' : 'text-chocolate'}`}>
        {name}
      </span>
    </div>
  )
}

/* ── 상품 카드 데모 컴포넌트 ── */
function ProductCardDemo({ name, price, badge }) {
  return (
    <div className="bg-white rounded-card shadow-warm-sm overflow-hidden hover:shadow-warm-hover hover:-translate-y-1 transition-all duration-300">
      {/* 이미지 영역 (플레이스홀더) */}
      <div className="bg-cream-dark h-48 flex items-center justify-center relative">
        <span className="font-body text-body text-neutral-300">600 x 450</span>
        {badge && (
          <span className="absolute top-3 left-3 bg-gold text-white font-body text-small font-medium px-3 py-1 rounded-button">
            {badge}
          </span>
        )}
      </div>
      {/* 정보 영역 */}
      <div className="p-5">
        <h3 className="font-display text-heading-3 text-chocolate mb-2">{name}</h3>
        <p className="font-accent text-body-lg text-gold font-medium">{price}원</p>
        <button className="mt-4 w-full bg-gold text-white rounded-button py-3 font-body font-medium text-caption hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300">
          장바구니 담기
        </button>
      </div>
    </div>
  )
}
