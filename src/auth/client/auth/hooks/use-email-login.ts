import { useCallback } from 'react'
import { LoginRequest, Account } from 'm3o/user'
import { usePost } from '../../hooks/use-post'
import { useAuth } from '../components/AuthProvider'

type LoginFields = Pick<LoginRequest, 'email' | 'password'>

interface LoginResponse {
  account: Account
}

export function useEmailLogin() {
  const { setUser } = useAuth()
  const { post, ...postState } = usePost('/api/user/login')

  const login = useCallback(async (payload: LoginFields) => {
    const response = await post<LoginFields, LoginResponse>(payload)

    if (response) {
      setUser(response.account)
    }
  }, [])

  return {
    ...postState,
    login
  }
}
