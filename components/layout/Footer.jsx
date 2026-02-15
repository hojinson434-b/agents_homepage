// 푸터 컴포넌트 — 브랜드 정보, 링크 모음, 저작권 표시
// 모든 페이지 하단에 자동 적용

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-chocolate dark:bg-dm-bg text-white dark:border-t dark:border-dm-border">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">

        {/* 상단 영역 — 브랜드 + 링크 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 md:py-16">

          {/* 브랜드 소개 */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-heading-2 text-white mb-4">Douceur</h3>
            <p className="font-body text-caption text-neutral-300 leading-relaxed">
              파리 파티스리의 우아함을 담은 프리미엄 디저트 쇼핑몰.
              매일 정성스럽게 만든 수제 디저트를 만나보세요.
            </p>
          </div>

          {/* 쇼핑 안내 */}
          <div>
            <h4 className="font-body text-body font-medium text-white mb-4">쇼핑 안내</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="font-body text-caption text-neutral-300 hover:text-gold transition-colors duration-200">
                  전체 상품
                </Link>
              </li>
              <li>
                <Link href="/products?category=cake" className="font-body text-caption text-neutral-300 hover:text-gold transition-colors duration-200">
                  케이크
                </Link>
              </li>
              <li>
                <Link href="/products?category=cookie" className="font-body text-caption text-neutral-300 hover:text-gold transition-colors duration-200">
                  쿠키
                </Link>
              </li>
              <li>
                <Link href="/products?category=macaron" className="font-body text-caption text-neutral-300 hover:text-gold transition-colors duration-200">
                  마카롱
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객 서비스 */}
          <div>
            <h4 className="font-body text-body font-medium text-white mb-4">고객 서비스</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/notice" className="font-body text-caption text-neutral-300 hover:text-gold transition-colors duration-200">
                  공지사항 / FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-body text-caption text-neutral-300 hover:text-gold transition-colors duration-200">
                  고객센터
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-body text-caption text-neutral-300 hover:text-gold transition-colors duration-200">
                  브랜드 소개
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="font-body text-body font-medium text-white mb-4">연락처</h4>
            <ul className="space-y-3 font-body text-caption text-neutral-300">
              <li>전화: 02-1234-5678</li>
              <li>이메일: hello@douceur.kr</li>
              <li>운영시간: 평일 10:00 - 18:00</li>
              <li>점심시간: 12:00 - 13:00</li>
            </ul>
          </div>
        </div>

        {/* 하단 영역 — 저작권 */}
        <div className="border-t border-neutral-500 dark:border-dm-border py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-small text-neutral-400">
              &copy; 2025 Douceur. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/notice" className="font-body text-small text-neutral-400 hover:text-gold transition-colors duration-200">
                이용약관
              </Link>
              <Link href="/notice" className="font-body text-small text-neutral-400 hover:text-gold transition-colors duration-200">
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
