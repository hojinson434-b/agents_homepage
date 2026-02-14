// 장바구니 Context — 전역 장바구니 상태 관리
// localStorage('douceur_cart')와 동기화하여 새로고침 후에도 유지

'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { products } from '@/lib/products'

const CartContext = createContext()

// 장바구니 아이템 구조:
// { productId, optionIndex, quantity, addedAt }

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // localStorage에서 장바구니 불러오기 (최초 1회)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('douceur_cart')
      if (saved) {
        setCartItems(JSON.parse(saved))
      }
    } catch (error) {
      console.error('장바구니 데이터 로드 실패:', error)
    }
    setIsLoaded(true)
  }, [])

  // 장바구니 변경 시 localStorage에 저장
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('douceur_cart', JSON.stringify(cartItems))
    }
  }, [cartItems, isLoaded])

  // 장바구니에 상품 추가
  const addToCart = useCallback((productId, optionIndex = 0, quantity = 1) => {
    setCartItems((prev) => {
      // 동일 상품 + 동일 옵션이 이미 있는지 확인
      const existingIndex = prev.findIndex(
        (item) => item.productId === productId && item.optionIndex === optionIndex
      )

      if (existingIndex >= 0) {
        // 이미 있으면 수량 추가
        const updated = [...prev]
        const product = products.find((p) => p.id === productId)
        const maxStock = product?.stock || 99
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(updated[existingIndex].quantity + quantity, maxStock),
        }
        return updated
      }

      // 새 아이템 추가
      return [
        ...prev,
        {
          productId,
          optionIndex,
          quantity,
          addedAt: new Date().toISOString(),
        },
      ]
    })
  }, [])

  // 장바구니에서 아이템 제거
  const removeFromCart = useCallback((productId, optionIndex) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.optionIndex === optionIndex)
      )
    )
  }, [])

  // 수량 변경
  const updateQuantity = useCallback((productId, optionIndex, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.optionIndex === optionIndex) {
          const product = products.find((p) => p.id === productId)
          const maxStock = product?.stock || 99
          return { ...item, quantity: Math.min(newQuantity, maxStock) }
        }
        return item
      })
    )
  }, [])

  // 장바구니 비우기
  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  // 장바구니 총 수량
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // 장바구니 총 금액 계산
  const cartTotal = cartItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId)
    if (!product) return sum

    const basePrice = product.salePrice || product.price
    const optionPrice = product.options[item.optionIndex]?.priceAdd || 0
    return sum + (basePrice + optionPrice) * item.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoaded,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// 장바구니 Context 사용 훅
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart는 CartProvider 안에서만 사용 가능합니다')
  }
  return context
}
