import { useCallback } from 'react'
import { CreateRequest } from 'm3o/user'
import { post } from '../../../ui/fetch'
import { useApiState, UseApiState } from '../../../ui/hooks/use-api-state'

type UseSignUp = Omit<UseApiState, 'setError' | 'setStatus'> & {
  signUp: (payload: CreateRequest) => void
}

export function useSignUp(): UseSignUp {
  const { setStatus, setError, ...apiState } = useApiState()

  const signUp = useCallback(async (payload: CreateRequest) => {
    setStatus('loading')

    try {
      await post<CreateRequest, {}>('/api/user/sign-up', payload)
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
    signUp
  }
}