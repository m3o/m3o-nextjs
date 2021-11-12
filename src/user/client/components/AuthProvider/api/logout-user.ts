import type { RequestError } from '../../../../shared/types'
import type { AuthDispatch } from '../types'
import { post } from '../../../../../ui/fetch'

export async function logoutUser(dispatch: AuthDispatch): Promise<void> {
  dispatch({ type: 'logout start' })

  try {
    await post('/api/user/logout')
    dispatch({ type: 'logout success' })
  } catch (e) {
    const { error } = e as RequestError
    dispatch({ type: 'logout error', payload: error.message })
  }
}
