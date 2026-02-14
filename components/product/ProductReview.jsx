// 상품 리뷰 섹션 컴포넌트 — 상품 상세 페이지에서 리뷰 목록 표시
// 별점 요약 + 개별 리뷰 카드

import { reviews } from '@/lib/products'

export default function ProductReview({ productId, rating, reviewCount }) {
  // 해당 상품의 리뷰 필터링
  const productReviews = reviews.filter((r) => r.productId === productId)

  return (
    <section className="mt-12">
      <h2 className="font-display text-heading-2 text-chocolate mb-6">
        고객 리뷰
      </h2>

      {/* 별점 요약 */}
      <div className="flex items-center gap-4 mb-8 p-6 bg-cream rounded-card">
        <div className="text-center">
          <p className="font-display text-hero-mobile text-gold">{rating}</p>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-body ${i < Math.floor(rating) ? 'text-gold' : 'text-neutral-200'}`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="font-body text-caption text-neutral-400 mt-1">
            {reviewCount}개의 리뷰
          </p>
        </div>
      </div>

      {/* 리뷰 목록 */}
      {productReviews.length > 0 ? (
        <div className="space-y-4">
          {productReviews.map((review) => (
            <div
              key={review.id}
              className="p-5 bg-white rounded-card shadow-warm-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* 아바타 */}
                  <div className="w-10 h-10 bg-cream-dark rounded-button flex items-center justify-center">
                    <span className="font-body text-caption text-neutral-400">
                      {review.userName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-body text-chocolate font-medium">
                      {review.userName}
                    </p>
                    <p className="font-body text-small text-neutral-400">
                      {review.date}
                    </p>
                  </div>
                </div>
                {/* 별점 */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-caption ${i < review.rating ? 'text-gold' : 'text-neutral-200'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="font-body text-body text-chocolate-light leading-relaxed">
                {review.content}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="font-body text-body text-neutral-400">
            아직 작성된 리뷰가 없습니다
          </p>
        </div>
      )}
    </section>
  )
}
