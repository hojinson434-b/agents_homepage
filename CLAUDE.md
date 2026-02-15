# CLAUDE.md — 디저트 쇼핑몰 프로젝트 지침서

> 이 파일은 Claude Code가 자동으로 읽는 지침서입니다.
> 모든 작업 시 이 규칙을 반드시 따르세요.

---

## 프로젝트 개요
- **프로젝트명:** agents_homepage (디저트 판매 쇼핑몰 — "Douceur")
- **기술 스택:** Next.js 14 (App Router) + React + Tailwind CSS
- **배포:** Vercel (GitHub 연동 자동 배포)
- **디자인 컨셉:** "Patisserie Moderne" — 파리 파티스리 우아함 + 현대적 미니멀리즘
- **대상 사용자:** 디저트 구매 고객 (20~40대 여성 중심)

---

## 작업 규칙 (필수)

### 일반 규칙
1. **한국어** — 주석, 커밋 메시지, 설명 모두 한국어
2. **계획 먼저** — 코드 작성 전에 항상 계획을 먼저 설명
3. **작은 단위** — 한 번에 1개 컴포넌트 또는 1개 기능만 작업
4. **파일 삭제 금지** — 기존 파일 삭제하지 말고, 필요하면 물어보기
5. **Git 커밋** — 기능 하나 완성될 때마다 커밋 (커밋 메시지 한국어)
6. **에러 시** — 에러 발생하면 즉시 멈추고 원인 설명 후 해결 방안 제시

### 코드 품질
7. **함수형 컴포넌트만** — class 컴포넌트 사용 금지
8. **'use client'** — 상태(useState), 이벤트, localStorage 사용하는 컴포넌트에만 붙이기
9. **주석** — 컴포넌트 상단에 용도 설명, 복잡한 로직에 한국어 주석
10. **네이밍** — 컴포넌트: PascalCase, 함수: camelCase, 파일: PascalCase.jsx

### 과거 병목에서 얻은 교훈 (반드시 준수)
11. **상태 단일 소스** — URL에 반영되는 데이터(카테고리, 필터 등)는 `useState`로 복제하지 말 것. `searchParams.get()`으로 직접 읽고 변경은 `router.push`로 한다. 같은 데이터를 두 곳에서 관리하면 동기화 버그가 발생한다.
12. **이미지 컴포넌트 선행 설계** — 이미지 파일이 없어도 처음부터 `next/image` + `onError` 폴백 구조로 작성한다. 이미지는 나중에 넣되, 넣는 순간 바로 동작하는 구조를 처음부터 갖춘다.

---

## 금지 사항

- ❌ Tailwind 테마에 없는 임의 색상값 사용 금지 (예: `text-[#abc123]`)
- ❌ 인라인 스타일 (style={{}}) 사용 금지 — Tailwind 클래스만 사용
- ❌ jQuery, Bootstrap, 기타 CSS 프레임워크 추가 금지
- ❌ TypeScript 사용 금지 (JavaScript만)
- ❌ 파일 임의 삭제 금지
- ❌ npm 패키지 임의 추가 금지 — 추가 필요 시 먼저 물어보기
- ❌ app/ 폴더 바깥에 페이지 만들지 말 것
- ❌ 하드코딩된 상품 데이터를 페이지 컴포넌트 안에 넣지 말 것 → lib/products.js 사용

---

## Tailwind 디자인 규칙 (핵심 — 반드시 준수)

### 색상 — tailwind.config.js 커스텀 컬러만 사용
```
좋은 예: bg-cream text-chocolate border-caramel
나쁜 예: bg-[#FDF6EC] text-[#3C2415] bg-amber-100
```
- tailwind.config.js에 정의된 커스텀 색상만 사용
- Tailwind 기본 색상 (red-500, blue-600 등) 사용 금지
- 예외: black, white, transparent, current

### 폰트 — 커스텀 폰트 패밀리 사용
```
제목/강조:  font-display    → Playfair Display
본문/UI:    font-body       → Noto Sans KR
영문 보조:  font-accent     → DM Sans
```

### 폰트 크기 — 커스텀 사이즈 사용
```
좋은 예: text-heading-1 text-body text-caption
나쁜 예: text-2xl text-base text-sm
```
- tailwind.config.js에 정의된 커스텀 폰트 크기만 사용

### 그림자 — 커스텀 그림자 사용
```
좋은 예: shadow-warm-sm shadow-warm-hover
나쁜 예: shadow-md shadow-lg
```

### 반응형 — 모바일 퍼스트
```jsx
// 좋은 예: 모바일 기본 → 태블릿 → 데스크톱
<div className="px-4 md:px-6 lg:px-8">
<h1 className="text-heading-2 lg:text-heading-1">

// 나쁜 예: 데스크톱 기본 → 모바일 축소
```

### 터치 영역
- 버튼, 링크 최소 높이: `h-12` (48px)
- 터치 대상 간 최소 간격: `gap-2`

---

## 컴포넌트 규칙

### 컴포넌트 구조
```
components/
├── ui/           # 범용 UI (Button, Input, Card, Modal, Toast, Badge)
├── layout/       # 레이아웃 (Header, Footer, MobileMenu, Container)
├── product/      # 상품 관련 (ProductCard, ProductGrid, ProductFilter)
├── cart/         # 장바구니 관련 (CartItem, CartSummary)
└── home/         # 메인 페이지 전용 (HeroBanner, PopularProducts)
```

### 새 컴포넌트 만들기 전에
1. components/ 폴더에 비슷한 컴포넌트가 이미 있는지 확인
2. 있으면 기존 컴포넌트의 props를 확장
3. 없으면 적절한 하위 폴더에 생성

### 컴포넌트 템플릿
```jsx
// components/ui/Button.jsx
// 공통 버튼 컴포넌트 — Primary, Secondary, Ghost 변형 지원

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) {
  const baseStyles = '...'
  const variants = { primary: '...', secondary: '...', ghost: '...' }
  const sizes = { sm: '...', md: '...', lg: '...' }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

### 재사용 Tailwind 패턴
```
// 버튼 Primary
bg-gold text-white rounded-button px-8 py-3 font-body font-medium
hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300

// 버튼 Secondary
border border-caramel text-chocolate-light rounded-button px-8 py-3
hover:bg-caramel hover:text-white transition-all duration-300

// 상품 카드
bg-white rounded-card shadow-warm-sm overflow-hidden
hover:shadow-warm-hover hover:-translate-y-1 transition-all duration-300

// 입력 필드
w-full h-12 px-4 border border-neutral-200 rounded-xl font-body
focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none

// 섹션 컨테이너
max-w-wide mx-auto px-4 md:px-6 lg:px-8

// 페이지 배경
bg-cream min-h-screen
```

---

## 파일 구조 규칙

### 경로 별칭 (@)
```jsx
// 좋은 예
import Button from '@/components/ui/Button'
import { products } from '@/lib/products'

// 나쁜 예
import Button from '../../../components/ui/Button'
```

### 레이아웃 (app/layout.js)
```jsx
// 전체 앱에 Header + Footer 자동 적용
// Google Fonts는 next/font로 불러오기
import { Playfair_Display, Noto_Sans_KR, DM_Sans } from 'next/font/google'
```

### 페이지 구조
```jsx
// app/products/page.js 예시
// 'use client' → 필터/검색 등 인터랙션이 있으므로 필요

'use client'
import ProductGrid from '@/components/product/ProductGrid'
import ProductFilter from '@/components/product/ProductFilter'

export default function ProductsPage() {
  return (
    <main className="bg-cream min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* 페이지 제목 */}
        {/* 필터 */}
        {/* 상품 그리드 */}
      </div>
    </main>
  )
}
```

---

## 데이터 규칙

### 상품 데이터
- 모든 상품 데이터: `lib/products.js` (export로 내보내기)
- 컴포넌트에서 import해서 사용
- 하드코딩 절대 금지

### 사용자 데이터 (localStorage)
- 키 이름 접두사: `douceur_`
  - `douceur_cart` — 장바구니
  - `douceur_wishlist` — 찜 목록
  - `douceur_user` — 로그인 정보
  - `douceur_orders` — 주문 내역
  - `douceur_theme` — 다크모드 설정

### Context API 사용
- 장바구니: CartContext (전역 상태)
- 인증: AuthContext (전역 상태)
- 찜: WishlistContext (전역 상태)

---

## 이미지 규칙

### next/image 필수 사용
```jsx
// 좋은 예
import Image from 'next/image'
<Image src="/images/products/cake.jpg" alt="딸기 케이크" width={600} height={450} />

// 나쁜 예
<img src="/images/products/cake.jpg" />
```

### 개발용 이미지
- Unsplash: `https://images.unsplash.com/photo-xxx?w=600&h=450&fit=crop`
- placehold.co: `https://placehold.co/600x450/FDF6EC/3C2415?text=케이크`
- next.config.js에 도메인 등록 필수

### 이미지 규격
- 상품 카드: 600×450px (4:3)
- 상품 상세: 800×800px (1:1)
- 히어로 배너: 1920×800px
- 카테고리: 200×200px

### 최적화
- priority 속성: 히어로 이미지에만 사용
- alt 텍스트 필수 (한국어)
- sizes 속성 활용

---

## 접근성 규칙

1. 모든 이미지에 alt 텍스트 (한국어)
2. 폼 요소에 label 연결 (htmlFor)
3. 버튼/링크에 focus 스타일 유지
4. 색상 대비 최소 4.5:1
5. 시맨틱 HTML 태그 사용 (header, nav, main, section, footer)
6. ARIA 속성 적절히 사용
7. 키보드 네비게이션 지원

---

## 성능 규칙

1. next/image로 이미지 최적화
2. 'use client'는 꼭 필요한 컴포넌트에만
3. 동적 import (next/dynamic) 활용 — 모달, 관리자 페이지 등
4. next/font로 폰트 최적화
5. 불필요한 npm 패키지 추가 금지

---

## Git 규칙

### 커밋 메시지 형식
```
[타입] 설명

예시:
[세팅] 프로젝트 초기 설정 및 Tailwind 테마 적용
[컴포넌트] Button 공통 컴포넌트 생성
[페이지] 메인 페이지 히어로 배너 구현
[기능] 장바구니 추가/삭제 기능 구현
[수정] 상품 카드 호버 효과 버그 수정
[스타일] 모바일 반응형 개선
```

### 커밋 타이밍
- 컴포넌트 1개 완성 → 커밋
- 페이지 1개 완성 → 커밋
- 기능 1개 완성 → 커밋
- 버그 수정 → 커밋