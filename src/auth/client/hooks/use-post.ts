import { useCallback } from 'react'
import { useApiState } from './use-api-state'
import { post as fetchPost } from '../fetch'
import { RequestError } from '../../shared/types'

export function usePost(url: string) {
  const { setStatus, setError, ...apiState } = useApiState()

  const post = useCallback(
    async <
      D extends Record<string, any> = {},
      R extends Record<string, any> = {}
    >(
      data: D
    ): Promise<R | undefined> => {
      try {
        return (await fetchPost(url, data)) as R
      } catch (e) {
        const error = e as RequestError['error']
        setError(error.message)
        return undefined
      }
    },
    []
  )

  return {
    ...apiState,
    post
  }
}
