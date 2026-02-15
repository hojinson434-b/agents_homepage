// 루트 레이아웃 — 전체 앱에 Header + Footer + Context Provider 적용
// 폰트는 globals.css에서 @import로 로드
import './globals.css'
import Providers from '@/components/Providers'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Douceur | 프리미엄 디저트 쇼핑몰',
  description: '파리 파티스리의 우아함을 담은 프리미엄 디저트 쇼핑몰. 케이크, 마카롱, 쿠키 등 수제 디저트를 만나보세요.',
  keywords: ['디저트', '케이크', '마카롱', '쿠키', '선물세트', '프리미엄 디저트', 'Douceur'],
  openGraph: {
    title: 'Douceur | 프리미엄 디저트 쇼핑몰',
    description: '파리 파티스리의 우아함을 담은 프리미엄 디저트 쇼핑몰',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Douceur',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Providers>
          {/* 키보드 접근성 — 본문으로 바로가기 */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-gold focus:text-white focus:px-4 focus:py-2 focus:rounded-button focus:font-body focus:text-caption"
          >
            본문으로 바로가기
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
