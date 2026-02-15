// 리뷰 미리보기 섹션 — 메인 페이지에서 최근 리뷰 4개 카드로 표시

import { reviews } from '@/lib/products'

export default function ReviewPreview() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">

        {/* 섹션 헤더 */}
        <div className="text-center mb-10">
          <p className="font-accent text-caption text-caramel font-medium tracking-wider mb-2">
            REVIEWS
          </p>
          <h2 className="font-display text-heading-1 text-chocolate">
            고객 후기
          </h2>
          <p className="font-body text-body text-chocolate-light mt-3">
            Douceur를 경험한 분들의 솔직한 이야기
          </p>
        </div>

        {/* 리뷰 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-cream rounded-card p-6 hover:shadow-warm-md transition-all duration-300"
            >
              {/* 별점 */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-caption ${i < review.rating ? 'text-gold' : 'text-neutral-200'}`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* 리뷰 내용 */}
              <p className="font-body text-caption text-chocolate-light leading-relaxed mb-4 line-clamp-3">
                &quot;{review.content}&quot;
              </p>

              {/* 리뷰 정보 */}
              <div className="border-t border-neutral-200 pt-3">
                <p className="font-body text-small text-neutral-400">
                  {review.userName} · {review.productName}
                </p>
                <p className="font-body text-small text-neutral-300 mt-1">
                  {review.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
