import type { ResetPasswordRequest } from 'm3o/user'
import type { RequestError } from '../../../types'
import { useCallback } from 'react'
import { useApiState } from '../../../ui/hooks/use-api-state'
import { post } from '../../../ui/fetch'
import { CONFIG } from '../../../config'

interface UseResetPassword {
  email: string
  onSuccess: VoidFunction
}

export default function useResetPassword({
  email,
  onSuccess
}: UseResetPassword) {
  const { setError, setStatus, ...apiState } = useApiState()

  const resetPassword = useCallback(
    async (payload: Omit<ResetPasswordRequest, 'email'>) => {
      setStatus('loading')

      try {
        await post(`/api/${CONFIG.API_FOLDER_NAME}/reset-password`, {
          ...payload,
          email
        })

        setStatus('idle')
        onSuccess()
      } catch (e) {
        const error = e as RequestError['error']
        setStatus('error')
        setError(error.message)
      }
    },
    [setStatus, setError, email]
  )

  return {
    ...apiState,
    resetPassword
  }
}
