import type { UpdatePasswordRequest } from 'm3o/user'
import type { AuthDispatch } from '../types'

export async function changePassword(
  payload: Omit<UpdatePasswordRequest, 'userId'>,
  dispatch: AuthDispatch
) {
  dispatch({ type: 'change password' })
  console.log(payload)
}
