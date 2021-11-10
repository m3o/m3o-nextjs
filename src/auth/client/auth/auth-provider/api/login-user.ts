import type { LoginRequest, Account } from 'm3o/user'
import type { AuthDispatch } from '../types'
import type { RequestError } from '../../../../shared/types'
import { post } from '../../../fetch'

export async function loginUser(payload: LoginRequest, dispatch: AuthDispatch) {
  dispatch({ type: 'login start' })

  try {
    const { account } = await post<LoginRequest, { account: Account }>(
      '/api/user/login',
      payload
    )
    dispatch({ type: 'login success', payload: account })
  } catch (e: any) {
    if (e.error) {
      const { error } = e as RequestError
      dispatch({ type: 'login error', payload: error.message })
    }
  }
}
