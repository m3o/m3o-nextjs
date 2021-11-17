import type { ResetPasswordRequest } from 'm3o/user'
import type { RequestError } from '../../../types'
import { useCallback } from 'react'
import { useApiState } from '../../../ui/hooks/use-api-state'
import { post } from '../../../ui/fetch'

export function useResetPassword(email: string) {
  const { setError, setStatus, ...apiState } = useApiState()

  const resetPassword = useCallback(
    async (payload: Omit<ResetPasswordRequest, 'email'>) => {
      setStatus('loading')

      try {
        await post('/api/user/reset-password', {
          ...payload,
          email
        })

        setStatus('idle')
      } catch (e) {
        console.log(e)
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
