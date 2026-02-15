// 인증 Context — 전역 로그인/회원가입 상태 관리
// localStorage('douceur_user')와 동기화하여 세션 유지 시뮬레이션

'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext()

// 사용자 데이터 구조:
// { id, name, email, phone, address, joinedAt }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // localStorage에서 사용자 정보 불러오기 (최초 1회)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('douceur_user')
      if (saved) {
        setUser(JSON.parse(saved))
      }
    } catch (error) {
      console.error('사용자 데이터 로드 실패:', error)
    }
    setIsLoaded(true)
  }, [])

  // 사용자 정보 변경 시 localStorage에 저장
  useEffect(() => {
    if (isLoaded) {
      if (user) {
        localStorage.setItem('douceur_user', JSON.stringify(user))
      } else {
        localStorage.removeItem('douceur_user')
      }
    }
  }, [user, isLoaded])

  // 회원가입
  const signup = useCallback((userData) => {
    // 기존 회원 목록에서 이메일 중복 확인
    const members = JSON.parse(localStorage.getItem('douceur_members') || '[]')
    const exists = members.find((m) => m.email === userData.email)
    if (exists) {
      return { success: false, message: '이미 가입된 이메일입니다.' }
    }

    // 새 회원 생성
    const newUser = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      address: '',
      joinedAt: new Date().toISOString(),
    }

    // 회원 목록에 추가 (비밀번호 포함하여 저장)
    members.push({
      ...newUser,
      password: userData.password,
    })
    localStorage.setItem('douceur_members', JSON.stringify(members))

    // 로그인 상태로 전환
    setUser(newUser)
    return { success: true, message: '회원가입이 완료되었습니다.' }
  }, [])

  // 로그인
  const login = useCallback((email, password) => {
    const members = JSON.parse(localStorage.getItem('douceur_members') || '[]')
    const member = members.find((m) => m.email === email && m.password === password)

    if (!member) {
      return { success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' }
    }

    // 비밀번호 제외하고 사용자 정보 설정
    const { password: _, ...userData } = member
    setUser(userData)
    return { success: true, message: '로그인되었습니다.' }
  }, [])

  // 로그아웃
  const logout = useCallback(() => {
    setUser(null)
  }, [])

  // 사용자 정보 수정
  const updateProfile = useCallback((updates) => {
    setUser((prev) => {
      if (!prev) return null
      const updated = { ...prev, ...updates }

      // 회원 목록에서도 업데이트
      try {
        const members = JSON.parse(localStorage.getItem('douceur_members') || '[]')
        const memberIndex = members.findIndex((m) => m.id === prev.id)
        if (memberIndex >= 0) {
          members[memberIndex] = { ...members[memberIndex], ...updates }
          localStorage.setItem('douceur_members', JSON.stringify(members))
        }
      } catch (error) {
        console.error('회원 정보 업데이트 실패:', error)
      }

      return updated
    })
  }, [])

  // 로그인 여부
  const isLoggedIn = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoaded,
        isLoggedIn,
        signup,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// 인증 Context 사용 훅
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth는 AuthProvider 안에서만 사용 가능합니다')
  }
  return context
}
