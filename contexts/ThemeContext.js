// 다크모드 테마 컨텍스트 — 다크/라이트 모드 전환 및 localStorage 저장
// document.documentElement에 'dark' 클래스를 토글하여 Tailwind dark: 변형 활성화

'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 초기 마운트 시 localStorage에서 테마 설정 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('douceur_theme')
    if (saved === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
    setMounted(true)
  }, [])

  // 테마 변경 시 document에 dark 클래스 토글 + localStorage 저장
  useEffect(() => {
    if (!mounted) return
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('douceur_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('douceur_theme', 'light')
    }
  }, [isDark, mounted])

  // 다크/라이트 토글
  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev)
  }, [])

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme은 ThemeProvider 안에서 사용해야 합니다.')
  }
  return context
}
