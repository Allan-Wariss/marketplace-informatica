import { useState } from 'react'
import type { IAuthUser } from '../types/IAuth'

const USER_KEY = 'auth_user'

const loadUser = (): IAuthUser | null => {
  try {
    const stored = localStorage.getItem(USER_KEY)
    return stored ? (JSON.parse(stored) as IAuthUser) : null
  } catch {
    return null
  }
}

export const useAuth = () => {
  const [user, setUser] = useState<IAuthUser | null>(loadUser)

  const login = (userData: IAuthUser) => {
    setUser(userData)
    localStorage.setItem('token', userData.token)
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem(USER_KEY)
  }

  return { user, login, logout }
}

