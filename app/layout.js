// 루트 레이아웃 — 전체 앱에 메타데이터 적용 (폰트는 globals.css에서 @import)
import './globals.css'

export const metadata = {
  title: 'Douceur | 프리미엄 디저트 쇼핑몰',
  description: '파리 파티스리의 우아함을 담은 프리미엄 디저트 쇼핑몰. 케이크, 마카롱, 쿠키 등 수제 디저트를 만나보세요.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
