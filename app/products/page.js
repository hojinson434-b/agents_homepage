// 상품 목록 페이지 — 카테고리 필터, 정렬, 검색 기능
// useSearchParams는 Suspense 바운더리 필요

'use client'

import { Suspense, useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { products } from '@/lib/products'
import ProductFilter from '@/components/product/ProductFilter'
import ProductGrid from '@/components/product/ProductGrid'

// Suspense로 감싸는 래퍼
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsContent />
    </Suspense>
  )
}

// 로딩 상태
function ProductsLoading() {
  return (
    <div className="bg-cream dark:bg-dm-bg min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <div className="h-10 w-48 bg-neutral-200 dark:bg-dm-card rounded-xl animate-pulse" />
          <div className="h-5 w-32 bg-neutral-100 rounded-xl animate-pulse mt-3" />
        </div>
      </div>
    </div>
  )
}

// 실제 상품 목록 컨텐츠
function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get('category') || 'all'

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl)
  const [sortBy, setSortBy] = useState('popular')
  const [searchQuery, setSearchQuery] = useState('')

  // URL 카테고리 파라미터 변경 시 상태 동기화
  useEffect(() => {
    setSelectedCategory(categoryFromUrl)
  }, [categoryFromUrl])

  // 필터링 + 정렬 로직
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // 카테고리 필터
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // 검색 필터 (상품명, 설명에서 검색)
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    }

    // 정렬
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'price-low':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
        break
      case 'price-high':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    return result
  }, [selectedCategory, sortBy, searchQuery])

  return (
    <div className="bg-cream dark:bg-dm-bg min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">

        {/* 페이지 제목 */}
        <div className="mb-8">
          <h1 className="font-display text-heading-1 lg:text-hero-mobile text-chocolate dark:text-cream">
            전체 상품
          </h1>
          <p className="font-body text-body text-chocolate-light dark:text-neutral-300 mt-2">
            총 {filteredProducts.length}개의 상품
          </p>
        </div>

        {/* 필터/검색 */}
        <div className="mb-8">
          <ProductFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* 상품 그리드 */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  )
}
