import type { ApiHookProps, ApiError } from '../../types'
import { useCallback } from 'react'
import { post } from '../../../ui/fetch'
import { useUser } from '../UserProvider'
import { useApiState } from '../../../ui/hooks/use-api-state'
import { CONFIG } from '../../../config'

export function useLogout({ onSuccess, onError }: ApiHookProps = {}) {
  const { setStatus, setError, ...apiState } = useApiState()
  const { setUser } = useUser()

  const logout = useCallback(async () => {
    setStatus('loading')

    try {
      await post(`/api/${CONFIG.API_FOLDER_NAME}/logout`, {})
      setUser()
      setStatus('idle')

      if (onSuccess) {
        onSuccess()
      }
    } catch (e) {
      const error = e as ApiError
      setError(error.message)
      setStatus('error')

      if (onError) {
        onError(error)
      }
    }
  }, [])

  return {
    ...apiState,
    logout
  }
}
