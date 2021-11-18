import { useCallback } from 'react'
import { CreateRequest } from 'm3o/user'
import { post } from '../../../ui/fetch'
import { useApiState, UseApiState } from '../../../ui/hooks/use-api-state'
import { CONFIG } from '../../../config'

type UseSignUp = Omit<UseApiState, 'setError' | 'setStatus'> & {
  signUp: (payload: CreateRequest) => void
}

export default function useSignUp(): UseSignUp {
  const { setStatus, setError, ...apiState } = useApiState()

  const signUp = useCallback(async (payload: CreateRequest) => {
    setStatus('loading')

    try {
      await post<CreateRequest, {}>(
        `/api/${CONFIG.API_FOLDER_NAME}/sign-up`,
        payload
      )
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
