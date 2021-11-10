import { useState } from 'react'

type ApiStatus = 'idle' | 'loading' | 'error'

interface UseApiState {
  error: string
  isError: boolean
  isLoading: boolean
  isIdle: boolean
  setError: (error: string) => void
  setStatus: (status: ApiStatus) => void
}

export function useApiState(): UseApiState {
  const [error, setError] = useState('')
  const [status, setStatus] = useState<ApiStatus>('idle')

  return {
    error,
    setError,
    setStatus,
    isError: status === 'error',
    isLoading: status === 'loading',
    isIdle: status === 'idle'
  }
}
