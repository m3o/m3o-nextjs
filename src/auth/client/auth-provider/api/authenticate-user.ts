import type { Account } from 'm3o/user'
import type { AuthDispatch } from '../types'

interface AuthenticateSuccessResponse {
  account: Account
}

export async function authenticateUser(dispatch: AuthDispatch): Promise<void> {
  dispatch({ type: 'authenticate' })

  try {
    const response = await fetch('/api/user/me')
    const { account } = (await response.json()) as AuthenticateSuccessResponse
    dispatch({ type: 'authenticate success', payload: account })
  } catch (e) {
    console.log('error', e)
  }
}
