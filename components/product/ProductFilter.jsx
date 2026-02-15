// 상품 필터/정렬/검색 컴포넌트 — 상품 목록 페이지 상단에 배치
// 카테고리 필터, 정렬 옵션, 실시간 검색 지원

'use client'

import { categories } from '@/lib/products'

// 정렬 옵션
const sortOptions = [
  { value: 'popular', label: '인기순' },
  { value: 'newest', label: '최신순' },
  { value: 'price-low', label: '가격 낮은순' },
  { value: 'price-high', label: '가격 높은순' },
  { value: 'rating', label: '별점순' },
]

export default function ProductFilter({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="space-y-6">

      {/* 검색 바 */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300"
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="상품명으로 검색하세요"
          className="w-full h-12 pl-12 pr-4 border border-neutral-200 rounded-xl font-body text-body text-chocolate outline-none transition-all duration-200 focus:border-caramel focus:ring-2 focus:ring-caramel/20"
        />
      </div>

      {/* 카테고리 필터 + 정렬 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* 카테고리 탭 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <button
            onClick={() => onCategoryChange('all')}
            className={`flex-shrink-0 px-5 py-2 rounded-button font-body text-caption font-medium transition-all duration-200 h-10 ${
              selectedCategory === 'all'
                ? 'bg-gold text-white'
                : 'bg-neutral-100 text-chocolate-light hover:bg-neutral-200'
            }`}
          >
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`flex-shrink-0 px-5 py-2 rounded-button font-body text-caption font-medium transition-all duration-200 h-10 ${
                selectedCategory === cat.id
                  ? 'bg-gold text-white'
                  : 'bg-neutral-100 text-chocolate-light hover:bg-neutral-200'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* 정렬 드롭다운 */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-10 px-4 border border-neutral-200 rounded-xl font-body text-caption text-chocolate-light outline-none transition-all duration-200 focus:border-caramel cursor-pointer bg-white"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
