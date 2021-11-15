import { useCallback } from 'react'
import { post } from '../../../ui/fetch'
import { useAuth } from '../components/AuthProvider'
import { useApiState } from '../../../ui/hooks/use-api-state'
import { CONFIG } from '../../../config'

export function useLogout() {
  const { setStatus, setError, ...apiState } = useApiState()
  const { setUser } = useAuth()

  const logout = useCallback(async () => {
    setStatus('loading')

    try {
      await post(`/api/${CONFIG.API_FOLDER_NAME}/logout`, {})
      setUser()
      setStatus('idle')
    } catch (e) {
      const error = e as { message: string }
      setError(error.message)
      setStatus('error')
    }
  }, [])

  return {
    ...apiState,
    logout
  }
}
