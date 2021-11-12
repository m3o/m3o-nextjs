import { useCallback } from 'react'
import { LoginRequest, Account } from 'm3o/user'
// import { usePost } from '../../hooks/use-post'
import { post } from '../../fetch'
import { useAuth } from '../components/AuthProvider'
import { useApiState } from '../../hooks/use-api-state'

type LoginFields = Pick<LoginRequest, 'email' | 'password'>

type LoginResponse = {
  account: Account
}

export function useEmailLogin() {
  const { setUser } = useAuth()
  const { setStatus, setError, ...apiState } = useApiState()

  const login = useCallback(async (payload: LoginFields) => {
    setStatus('loading')

    try {
      const response = await post<LoginFields, LoginResponse>(
        '/api/user/login',
        payload
      )

      setUser(response.account)
      setStatus('idle')
    } catch (e) {
      const error = e as { message: string }
      setError(error.message)
      setStatus('error')
      throw error.message
    }
  }, [])

  return {
    ...apiState,
    login
  }
}
