// 전역 Provider 래퍼 — layout.js에서 사용
// 'use client' → Context API 사용

'use client'

import { CartProvider } from '@/contexts/CartContext'
import { WishlistProvider } from '@/contexts/WishlistContext'

export default function Providers({ children }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
      </WishlistProvider>
    </CartProvider>
  )
}
