import type { Session, ReadResponse } from 'm3o/user'
import { user } from '../../../../services'

export async function readSession(sessionId: string): Promise<Session> {
  const readSessionResponse = await user.readSession({
    sessionId
  })

  return readSessionResponse.session as Session
}

export function getUserById(userId: string): Promise<ReadResponse> {
  return user.read({
    id: userId
  })
}
