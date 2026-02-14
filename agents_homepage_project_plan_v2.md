# 🍰 agents_homepage — 디저트 쇼핑몰 프로젝트 계획서 v2

> **목표:** 상용 배포 직전 수준의 디저트 판매 쇼핑몰
> **기술 스택:** Next.js 14 (App Router) + React + Tailwind CSS
> **개발 도구:** Claude Code (에이전트 모드)
> **배포:** Vercel (GitHub 연동 자동 배포)
> **버전:** v2 — Next.js 전환 버전

---

## 1. 이전 프로젝트에서 배운 교훈 (에러 방지 전략)

### ❌ 이전에 겪었던 문제들
| 문제 | 원인 | 이번 해결책 |
|------|------|------------|
| Cowork Shell 터미널 명령 실패 | Windows-MCP PATH 문제 | Claude Code는 직접 터미널 실행 → 문제 없음 |
| 10분 이상 작업 멈춤 | Cowork 대형 작업 시 타임아웃 | Claude Code는 터미널 기반이라 안정적 |
| 파일 구조 뒤엉킴 | 계획 없이 바로 코딩 시작 | **이 계획서 + CLAUDE.md로 사전 설계** |
| 디자인 일관성 없음 | 디자인 시스템 미정의 | **Tailwind 커스텀 테마 + 컴포넌트 시스템** |
| Firebase 배포 실패 | Node.js PATH + CLI 문제 | **Vercel 자동 배포** (Git push만 하면 끝) |
| 코드 반복/중복 | 공통 컴포넌트 미분리 | **React 컴포넌트 재사용 구조** |
| 헤더/푸터 관리 고통 | 모든 HTML에 복붙 | **React 레이아웃 시스템으로 자동 적용** |

### ✅ 이번 프로젝트 핵심 원칙
1. **계획 먼저, 코딩 나중** — 이 문서 확정 후 코딩 시작
2. **작은 단위로 작업** — 한 번에 1개 컴포넌트/페이지씩 완성
3. **Tailwind 커스텀 테마** — 디자인 토큰을 tailwind.config.js에 정의
4. **Git 커밋 자주** — 기능 하나 완성될 때마다 커밋
5. **모바일 퍼스트** — 모바일부터 만들고 데스크톱으로 확장
6. **컴포넌트 먼저** — 공통 UI 컴포넌트를 먼저 만들고, 페이지를 조립

---

## 2. Next.js가 호진한테 좋은 이유 (초보자 관점)

### 순수 HTML vs Next.js 비교

| 과거 (순수 HTML) | 지금 (Next.js) |
|---|---|
| 헤더/푸터를 모든 HTML에 복붙 | layout.js에 한 번만 작성 → 자동 적용 |
| 페이지 이동 시 전체 새로고침 | 부드러운 페이지 전환 (SPA) |
| 상품 데이터를 JSON으로 수동 관리 | 나중에 DB 연결 쉬움 |
| localStorage로 장바구니 시뮬레이션 | 나중에 서버 API로 교체 가능 |
| 배포 시 터미널 명령 실패 | Git push만 하면 Vercel이 자동 배포 |

### 바이브코딩으로 React 걱정 없는 이유
- Claude Code에게 "로그인 페이지 만들어줘"라고 하면 React 코드를 자동 생성
- 호진이 React 문법을 몰라도 결과물은 동일
- 수정할 때도 "버튼 색상 바꿔줘"처럼 자연어로 요청

---

## 3. 사이트맵 & 페이지 구성

### Next.js App Router 기준 라우팅 구조
```
app/
├── layout.js               # 전체 레이아웃 (헤더+푸터 자동 적용)
├── page.js                 # 메인 페이지 (/)
├── globals.css             # 전역 CSS (Tailwind 포함)
│
├── products/
│   ├── page.js             # 상품 목록 (/products)
│   └── [id]/
│       └── page.js         # 상품 상세 (/products/prod-001)
│
├── cart/
│   └── page.js             # 장바구니 (/cart)
│
├── checkout/
│   ├── page.js             # 주문/결제 (/checkout)
│   └── complete/
│       └── page.js         # 주문 완료 (/checkout/complete)
│
├── auth/
│   ├── login/
│   │   └── page.js         # 로그인 (/auth/login)
│   └── signup/
│       └── page.js         # 회원가입 (/auth/signup)
│
├── mypage/
│   └── page.js             # 마이페이지 (/mypage)
│
├── about/
│   └── page.js             # 브랜드 소개 (/about)
│
├── notice/
│   └── page.js             # 공지사항/FAQ (/notice)
│
├── contact/
│   └── page.js             # 고객센터 (/contact)
│
└── admin/
    └── page.js             # 관리자 페이지 (/admin)
```

### 각 페이지 상세 구성

**메인 페이지 (/)**
- 히어로 배너 (시즌 디저트 슬라이드)
- 인기 상품 캐러셀
- 새 상품 그리드
- 브랜드 스토리 미니 섹션
- 리뷰 미리보기

**상품 목록 (/products)**
- 카테고리 필터 (케이크, 쿠키, 마카롱, 음료 등)
- 정렬 (인기순, 가격순, 최신순)
- 상품 카드 그리드
- 검색 기능

**상품 상세 (/products/[id])**
- 이미지 갤러리 (메인 + 썸네일)
- 상품 정보 (이름, 가격, 설명, 옵션)
- 수량 선택 + 장바구니 담기
- 리뷰 섹션
- 관련 상품 추천

**장바구니 (/cart)**
- 담은 상품 리스트 (수량 변경, 삭제)
- 총 금액 계산 + 배송비
- 주문하기 버튼

**주문/결제 (/checkout)**
- 배송 정보 입력 폼
- 결제 수단 선택 (UI만)
- 주문 요약

**회원 관련**
- 로그인 / 회원가입 (localStorage 시뮬레이션)
- 마이페이지 (주문 내역, 정보 수정, 찜 목록)

**관리자 (/admin)**
- 대시보드 (주문 현황, 매출 요약)
- 상품 관리 (CRUD)
- 주문 관리

---

## 4. 디자인 시스템 (Tailwind 커스텀 테마)

### 4-1. 미적 방향

**컨셉:** "Patisserie Moderne" — 파리 파티스리의 우아함 + 현대적 미니멀리즘
**핵심 키워드:** 따뜻함, 고급스러움, 달콤함, 신뢰감
**톤:** 크림색 배경 위에 다크 초콜릿 타이포그래피, 골드 포인트, 부드러운 곡선

### 4-2. tailwind.config.js 커스텀 테마

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      /* ── 컬러 팔레트 ── */
      colors: {
        cream:     { DEFAULT: '#FDF6EC', dark: '#FAF0E1' },
        chocolate: { DEFAULT: '#3C2415', light: '#6B4226' },
        caramel:   { DEFAULT: '#C8956C' },
        gold:      { DEFAULT: '#D4A847' },
        rose:      { DEFAULT: '#E8A0BF' },
        success:   { DEFAULT: '#7DB87D' },
        error:     { DEFAULT: '#D94F4F' },
        warning:   { DEFAULT: '#E8C547' },
        info:      { DEFAULT: '#6BA3C8' },
        neutral: {
          100: '#F5F0EB',
          200: '#E8DFD5',
          300: '#C4B8AC',
          400: '#9A8D82',
          500: '#6E6259',
        },
      },

      /* ── 폰트 ── */
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"Noto Sans KR"', 'sans-serif'],
        accent:  ['"DM Sans"', 'sans-serif'],
      },

      /* ── 폰트 크기 (모바일 퍼스트) ── */
      fontSize: {
        'hero-mobile':  ['2.5rem',  { lineHeight: '1.2' }],   // 40px
        'hero-desktop': ['3.5rem',  { lineHeight: '1.15' }],  // 56px
        'heading-1':    ['2rem',    { lineHeight: '1.25' }],   // 32px
        'heading-2':    ['1.5rem',  { lineHeight: '1.3' }],    // 24px
        'heading-3':    ['1.25rem', { lineHeight: '1.4' }],    // 20px
        'body-lg':      ['1.125rem',{ lineHeight: '1.6' }],    // 18px
        'body':         ['1rem',    { lineHeight: '1.6' }],    // 16px
        'caption':      ['0.875rem',{ lineHeight: '1.5' }],    // 14px
        'small':        ['0.75rem', { lineHeight: '1.5' }],    // 12px
      },

      /* ── 그림자 (따뜻한 톤) ── */
      boxShadow: {
        'warm-sm':   '0 1px 3px rgba(60, 36, 21, 0.08)',
        'warm-md':   '0 4px 12px rgba(60, 36, 21, 0.10)',
        'warm-lg':   '0 8px 24px rgba(60, 36, 21, 0.12)',
        'warm-xl':   '0 16px 48px rgba(60, 36, 21, 0.16)',
        'warm-hover':'0 8px 30px rgba(60, 36, 21, 0.15)',
      },

      /* ── 둥글기 ── */
      borderRadius: {
        'card':   '20px',
        'button': '9999px',
      },

      /* ── 트랜지션 ── */
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      /* ── 애니메이션 ── */
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in-up':     'fadeInUp 0.5s ease forwards',
        'fade-in':        'fadeIn 0.3s ease forwards',
        'slide-in-right': 'slideInRight 0.5s ease forwards',
      },

      /* ── 레이아웃 ── */
      maxWidth: {
        'content': '960px',
        'wide':    '1280px',
      },
    },
  },
  plugins: [],
}
```

### 4-3. 핵심 Tailwind 클래스 패턴 (재사용)

```
버튼 (Primary):  bg-gold text-white rounded-button px-8 py-3 font-body font-medium
                 hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300

버튼 (Secondary): border border-caramel text-chocolate-light rounded-button px-8 py-3
                  hover:bg-caramel hover:text-white transition-all duration-300

상품 카드:       bg-white rounded-card shadow-warm-sm overflow-hidden
                 hover:shadow-warm-hover hover:-translate-y-1 transition-all duration-300

입력 필드:       w-full h-12 px-4 border border-neutral-200 rounded-xl font-body
                 focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none
                 transition-all duration-200

페이지 배경:     bg-cream min-h-screen

섹션 컨테이너:   max-w-wide mx-auto px-4 md:px-6 lg:px-8

제목 (Display):  font-display text-chocolate font-bold
본문 텍스트:     font-body text-chocolate-light leading-relaxed
```

---

## 5. 폴더 구조

```
agents_homepage/
├── app/
│   ├── layout.js                   # 전체 레이아웃
│   ├── page.js                     # 메인 페이지
│   ├── globals.css                 # Tailwind + 전역 스타일
│   ├── products/
│   │   ├── page.js                 # 상품 목록
│   │   └── [id]/
│   │       └── page.js             # 상품 상세
│   ├── cart/
│   │   └── page.js
│   ├── checkout/
│   │   ├── page.js
│   │   └── complete/
│   │       └── page.js
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.js
│   │   └── signup/
│   │       └── page.js
│   ├── mypage/
│   │   └── page.js
│   ├── about/
│   │   └── page.js
│   ├── notice/
│   │   └── page.js
│   ├── contact/
│   │   └── page.js
│   └── admin/
│       └── page.js
│
├── components/
│   ├── ui/                          # 기본 UI 컴포넌트
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   ├── Badge.jsx
│   │   ├── Spinner.jsx
│   │   └── Rating.jsx
│   ├── layout/                      # 레이아웃 컴포넌트
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── MobileMenu.jsx
│   │   └── Container.jsx
│   ├── product/                     # 상품 관련 컴포넌트
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductFilter.jsx
│   │   ├── ProductGallery.jsx
│   │   └── ProductReview.jsx
│   ├── cart/                        # 장바구니 관련
│   │   ├── CartItem.jsx
│   │   └── CartSummary.jsx
│   └── home/                        # 메인 페이지 전용
│       ├── HeroBanner.jsx
│       ├── PopularProducts.jsx
│       ├── NewArrivals.jsx
│       └── BrandStory.jsx
│
├── lib/                             # 유틸리티 & 데이터
│   ├── products.js                  # 상품 데이터
│   ├── cart.js                      # 장바구니 로직 (localStorage)
│   ├── auth.js                      # 인증 로직 (localStorage)
│   ├── utils.js                     # 공통 유틸 (가격 포맷 등)
│   └── constants.js                 # 상수 (카테고리, 배송비 등)
│
├── hooks/                           # 커스텀 React 훅
│   ├── useCart.js
│   ├── useAuth.js
│   ├── useWishlist.js
│   └── useScrollAnimation.js
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── products/
│   │   ├── brand/
│   │   └── icons/
│   └── favicon.ico
│
├── CLAUDE.md                        # Claude Code 지침서
├── README.md
├── package.json
├── tailwind.config.js
├── next.config.js
├── jsconfig.json                    # 경로 별칭 (@/components 등)
└── .gitignore
```

---

## 6. 데이터 구조

### 상품 데이터 (lib/products.js)
```js
export const categories = [
  { id: 'cake',    name: '케이크',   icon: '🎂' },
  { id: 'cookie',  name: '쿠키',     icon: '🍪' },
  { id: 'macaron', name: '마카롱',   icon: '🧁' },
  { id: 'bread',   name: '빵',       icon: '🥐' },
  { id: 'drink',   name: '음료',     icon: '☕' },
  { id: 'gift',    name: '선물세트', icon: '🎁' },
]

export const products = [
  {
    id: 'prod-001',
    name: '딸기 생크림 케이크',
    nameEn: 'Strawberry Fresh Cream Cake',
    category: 'cake',
    price: 38000,
    salePrice: null,
    description: '신선한 딸기와 부드러운 생크림의 조화',
    detailDescription: '매일 아침 공수되는 국내산 딸기와...',
    images: ['/images/products/strawberry-cake-1.jpg'],
    options: [
      { name: '미니 (1호)', priceAdd: 0 },
      { name: '레귤러 (2호)', priceAdd: 10000 },
      { name: '라지 (3호)', priceAdd: 22000 },
    ],
    tags: ['인기', '베스트'],
    badge: 'BEST',
    stock: 50,
    rating: 4.8,
    reviewCount: 124,
    isNew: false,
    allergens: ['밀', '우유', '달걀'],
    storageMethod: '냉장 보관 (0~5°C)',
    shelfLife: '제조일로부터 3일',
  },
  // ... 더 많은 상품
]
```

### localStorage 키 규칙
```
douceur_cart       → 장바구니 데이터
douceur_wishlist   → 찜 목록
douceur_user       → 로그인 사용자 정보
douceur_orders     → 주문 내역
douceur_theme      → 다크모드 설정
```

---

## 7. 기능 구현 범위

### ✅ 구현할 것
| 기능 | 저장 방식 | 설명 |
|------|-----------|------|
| 상품 목록/필터/정렬 | lib/products.js | 카테고리, 가격, 인기순 등 |
| 상품 상세 보기 | 동적 라우트 [id] | 이미지 갤러리, 옵션 선택 |
| 장바구니 | localStorage + Context | 추가/수정/삭제, 수량 변경 |
| 찜하기 | localStorage + Context | 하트 토글 |
| 회원가입/로그인 | localStorage | 시뮬레이션 |
| 마이페이지 | localStorage | 주문내역, 정보수정 |
| 주문/결제 | localStorage | UI 완성, 실결제 미연동 |
| 상품 검색 | 클라이언트 필터 | 실시간 검색 |
| 반응형 디자인 | Tailwind | 모바일/태블릿/데스크톱 |
| 스크롤 애니메이션 | Intersection Observer | 페이드인, 슬라이드 |
| 관리자 페이지 | localStorage | 상품 CRUD, 주문관리 |
| 다크모드 | Tailwind dark: | 토글 스위치 |
| 페이지 전환 애니메이션 | Next.js | 부드러운 SPA 전환 |
| SEO 기본 | Next.js metadata | 메타태그, OG 이미지 |

### ❌ 구현하지 않을 것 (추후 확장)
- 실제 결제 (PG사 연동)
- 실제 서버/DB (Supabase, Firebase 등)
- 실제 이메일 발송
- 실시간 채팅 상담
- 사용자 업로드 이미지

---

## 8. 개발 순서 (Phase별)

### Phase 0: 프로젝트 세팅 ⚙️
```
□ GitHub 레포 생성
□ npx create-next-app@latest agents_homepage
□ Tailwind CSS 설정 + 커스텀 테마
□ 폴더 구조 생성
□ CLAUDE.md 작성
□ jsconfig.json 경로 별칭 설정
□ Vercel 연동 (GitHub 레포 연결)
□ 첫 배포 확인
```

### Phase 1: 디자인 시스템 & 공통 컴포넌트 🎨
```
□ Button, Input, Card, Badge, Modal, Toast 컴포넌트
□ Header (네비게이션 + 모바일 메뉴)
□ Footer
□ Container (레이아웃 래퍼)
□ app/layout.js에 Header+Footer 적용
→ 이 단계에서 디자인 에이전트를 집중 활용
→ 컴포넌트 하나 만들 때마다 git commit
```

### Phase 2: 메인 페이지 🏠
```
□ HeroBanner (슬라이드)
□ PopularProducts (캐러셀)
□ NewArrivals (그리드)
□ BrandStory (미니 섹션)
□ 리뷰 미리보기
□ 스크롤 애니메이션 적용
```

### Phase 3: 상품 관련 페이지 🛍️
```
□ 상품 데이터 완성 (lib/products.js, 최소 12개)
□ 상품 목록 페이지 (필터, 정렬, 검색)
□ 상품 상세 페이지 (갤러리, 옵션, 리뷰)
□ 상품 카드 호버 효과
```

### Phase 4: 쇼핑 기능 🛒
```
□ 장바구니 Context + localStorage
□ 장바구니 페이지
□ 찜하기 기능
□ 주문/결제 페이지 (UI)
□ 주문 완료 페이지
```

### Phase 5: 회원 기능 👤
```
□ 로그인/회원가입 (localStorage 시뮬레이션)
□ 마이페이지 (주문내역, 정보수정, 찜목록)
□ 폼 유효성 검증
```

### Phase 6: 관리자 & 부가 페이지 📋
```
□ 관리자 대시보드
□ 상품 관리 (CRUD)
□ 주문 관리
□ 브랜드 소개 페이지
□ 공지사항/FAQ
□ 고객센터
```

### Phase 7: 마무리 & 배포 🚀
```
□ 다크모드 구현
□ 접근성 검수
□ 성능 최적화 (이미지 next/image, lazy load)
□ SEO 메타데이터
□ 크로스 브라우저 테스트
□ Vercel 최종 배포 확인
□ 최종 QA
```

---

## 9. Claude Code 에이전트 활용 전략

### Phase별 에이전트 요청 예시

**Phase 0 (세팅):**
```
에이전트 모드로 다음 작업을 수행해줘:
1. create-next-app으로 프로젝트 생성
2. tailwind.config.js에 커스텀 테마 적용
3. 폴더 구조 생성 (components/ui, components/layout 등)
4. app/globals.css에 Tailwind 기본 설정
5. jsconfig.json 경로 별칭 설정
각 단계 완료 후 git commit.
```

**Phase 1 (디자인 에이전트 집중):**
```
에이전트 모드로 디자인 시스템을 구축해줘:
1. components/ui/Button.jsx — Primary, Secondary, Ghost 변형
2. components/ui/Card.jsx — 상품 카드용
3. components/ui/Input.jsx — 폼 입력 필드
4. components/layout/Header.jsx — 반응형 네비게이션
5. components/layout/Footer.jsx

CLAUDE.md의 디자인 규칙과 Tailwind 테마를 반드시 따라.
각 컴포넌트는 모바일 퍼스트로 작성.
완성 후 git commit.
```

### 에이전트 모드에서 에러 줄이는 팁
1. **한 번에 5개 이하** 파일만 요청
2. **구체적으로** 요청 (추상적이면 에러↑)
3. **커밋 포인트** 명시 (어디서 끊을지)
4. **기존 컴포넌트 참조** 명시 ("Button.jsx 패턴을 따라서...")

---

## 10. 이미지 전략

### 개발 중
Next.js의 `next/image` 활용 + Unsplash 이미지:
```jsx
<Image
  src="https://images.unsplash.com/photo-xxx?w=600&h=450&fit=crop"
  alt="딸기 생크림 케이크"
  width={600}
  height={450}
  className="object-cover"
/>
```

### next.config.js 이미지 도메인 설정
```js
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
}
```

### 이미지 규격
- 상품 카드: 600×450px (4:3)
- 상품 상세: 800×800px (1:1)
- 히어로 배너: 1920×800px
- 카테고리: 200×200px

---

## 11. 배포 전략 (Vercel)

### 초기 설정 (한 번만)
1. https://vercel.com 에 GitHub 계정으로 로그인
2. "Import Project" → agents_homepage 레포 선택
3. Framework: Next.js 자동 감지
4. 배포 버튼 클릭 → 끝!

### 이후 워크플로우
```
코드 수정 → git add → git commit → git push
→ Vercel이 자동으로 감지 → 자동 빌드 → 자동 배포
→ https://agents-homepage.vercel.app 에서 확인
```

터미널 명령 하나도 필요 없어요. Push만 하면 돼요.

---

## 12. 나중에 실제 쇼핑몰로 확장할 때

이번에 Next.js로 만들어두면, 나중에 이렇게 확장 가능:

| 현재 (시뮬레이션) | 실제 (확장) |
|---|---|
| localStorage 장바구니 | Supabase/Firebase DB |
| localStorage 회원 | NextAuth.js 인증 |
| lib/products.js 정적 데이터 | DB + API 라우트 |
| UI만 있는 결제 페이지 | 토스페이먼츠/아임포트 PG |
| Unsplash 이미지 | 실제 상품 촬영 이미지 |

**구조를 안 바꾸고** 데이터 소스만 교체하면 됩니다.

---

## 체크리스트: 코딩 시작 전 확인사항

- [ ] GitHub 레포 생성 완료
- [ ] Node.js 18+ 설치 확인
- [ ] 로컬에 클론 완료
- [ ] Claude Code 정상 실행 확인
- [ ] Vercel 계정 생성
- [ ] 디자인 컨셉 확정 (이 문서의 4번 섹션)
- [ ] 상품 데이터 초안 준비 (카테고리 6개, 상품 최소 12개)

---

> **다음 단계:** 이 계획서 확정 → GitHub 레포 생성 → Claude Code로 Phase 0 시작
