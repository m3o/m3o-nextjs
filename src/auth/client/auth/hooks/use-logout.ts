import { useCallback } from 'react'
import { usePost } from '../../hooks/use-post'
import { useAuth } from '../auth-provider'

export function useLogout() {
  const { setUser } = useAuth()
  const { post, ...postState } = usePost('/api/user/logout')

  const logout = useCallback(async () => {
    const response = await post({})

    if (response) {
      // Setting empty with reset.
      setUser()
    }
  }, [])

  return {
    ...postState,
    logout
  }
}
