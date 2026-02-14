// 루트 레이아웃 — 전체 앱에 폰트 + 메타데이터 적용
import { Playfair_Display, Noto_Sans_KR, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Douceur | 프리미엄 디저트 쇼핑몰',
  description: '파리 파티스리의 우아함을 담은 프리미엄 디저트 쇼핑몰. 케이크, 마카롱, 쿠키 등 수제 디저트를 만나보세요.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${playfair.variable} ${notoSansKR.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
