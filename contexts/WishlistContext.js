// 찜 목록 Context — 전역 위시리스트 상태 관리
// localStorage('douceur_wishlist')와 동기화

'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // localStorage에서 찜 목록 불러오기 (최초 1회)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('douceur_wishlist')
      if (saved) {
        setWishlistItems(JSON.parse(saved))
      }
    } catch (error) {
      console.error('찜 목록 데이터 로드 실패:', error)
    }
    setIsLoaded(true)
  }, [])

  // 찜 목록 변경 시 localStorage에 저장
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('douceur_wishlist', JSON.stringify(wishlistItems))
    }
  }, [wishlistItems, isLoaded])

  // 찜하기 토글 (있으면 제거, 없으면 추가)
  const toggleWishlist = useCallback((productId) => {
    setWishlistItems((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      }
      return [...prev, productId]
    })
  }, [])

  // 찜 여부 확인
  const isInWishlist = useCallback(
    (productId) => wishlistItems.includes(productId),
    [wishlistItems]
  )

  // 찜 목록 비우기
  const clearWishlist = useCallback(() => {
    setWishlistItems([])
  }, [])

  // 찜 목록 개수
  const wishlistCount = wishlistItems.length

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        isLoaded,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

// 찜 목록 Context 사용 훅
export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist는 WishlistProvider 안에서만 사용 가능합니다')
  }
  return context
}
