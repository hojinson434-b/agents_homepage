// 상품 그리드 컴포넌트 — 필터링/정렬된 상품 목록을 반응형 그리드로 표시
// 상품이 없을 때 빈 상태 메시지 표시

import ProductCard from '@/components/product/ProductCard'

export default function ProductGrid({ products }) {
  // 결과 없음
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-display text-heading-2 text-neutral-300 mb-3">
          검색 결과가 없습니다
        </p>
        <p className="font-body text-body text-neutral-400">
          다른 검색어나 카테고리를 선택해보세요
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
