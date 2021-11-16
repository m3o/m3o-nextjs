import type { NextApiRequest, NextApiResponse } from 'next'
import { sendError } from '../../../utils/errors'
import { loginUser } from './routes/login'
import { signUp } from './routes/signUp'
import { me } from './routes/me'
import { logoutUser } from './routes/logoutUser'
import { changePassword } from './routes/changePassword'
import { verify } from './routes/verify'

enum Methods {
  Get = 'GET',
  Post = 'POST'
}

export function handleAuth() {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req
    const route = query.m3oUser as string

    if (route === 'login' && method === Methods.Post) {
      return loginUser(req, res)
    }

    if (route === 'logout' && method === Methods.Post) {
      return logoutUser(req, res)
    }

    if (route === 'sign-up' && method === Methods.Post) {
      return signUp(req, res)
    }

    if (route === 'me' && method === Methods.Get) {
      return me(req, res)
    }

    if (route === 'change-password' && method === Methods.Post) {
      return changePassword(req, res)
    }

    if (route === 'verify' && method === Methods.Post) {
      return verify(req, res)
    }

    return sendError({ message: 'Method not allowed', res, statusCode: 405 })
  }
}
