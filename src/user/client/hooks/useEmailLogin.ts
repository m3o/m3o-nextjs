import { useCallback } from 'react'
import { LoginRequest, Account } from 'm3o/user'
import { post } from '../../../ui/fetch'
import { useAuth } from '../components/AuthProvider/AuthProvider'
import { useApiState } from '../../../ui/hooks/use-api-state'
import { CONFIG } from '../../../config'

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
        `/api/${CONFIG.API_FOLDER_NAME}/login`,
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
