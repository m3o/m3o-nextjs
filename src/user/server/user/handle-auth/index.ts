import type { NextApiRequest, NextApiResponse } from 'next'
import type {
  Session,
  VerifyEmailRequest,
  UpdatePasswordRequest
} from 'm3o/user'
import type { M3ORequestError } from '../../../../types'
import cookie from 'cookie'
import { user } from '../../../../services'
import { sendError } from '../../../../utils/errors'
import { loginUser } from './routes/login'
import { signUp } from './routes/sign-up'

type UpdatePasswordBody = Omit<UpdatePasswordRequest, 'userId'>

const AUTH_COOKIE_NAME = 'm3o-auth-session'

enum M3OErrors {
  IncorrectCurrentPassword = 'crypto/bcrypt: hashedPassword is not the hash of the given password',
  IncorrectVerifyToken = 'token not found',
  IncorrectLoginPassword = 'crypto/bcrypt: hashedPassword is not the hash of the given password'
}

enum Methods {
  Get = 'GET',
  Post = 'POST'
}

function getUserById(userId: string) {
  return user.read({
    id: userId
  })
}

async function readSession(sessionId: string): Promise<Session> {
  const readSessionResponse = await user.readSession({
    sessionId
  })

  return readSessionResponse.session as Session
}

async function getLoggedInUser(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req
  const sessionId = cookies[AUTH_COOKIE_NAME]

  if (!cookies[AUTH_COOKIE_NAME]) {
    sendError({ message: 'No token provided', res, statusCode: 401 })
    return
  }

  try {
    const session = await readSession(sessionId)
    const userResponse = await getUserById(session.userId!)

    res.json({
      account: userResponse.account
    })
  } catch (e) {}
}

async function logoutUser(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req
  const sessionId: string | undefined = cookies['m3o-auth-session']

  if (!sessionId) {
    sendError({ message: 'No token provided', res, statusCode: 401 })
    return
  }

  try {
    await user.logout({ sessionId })

    res.setHeader('Set-Cookie', [
      cookie.serialize(AUTH_COOKIE_NAME, '', {
        path: '/',
        sameSite: 'strict',
        expires: new Date(0)
      })
    ])

    res.json({})
  } catch (e) {
    sendError({ message: 'Server error', res, statusCode: 500 })
  }
}

async function changePassword(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req
  const sessionId: string | undefined = cookies[AUTH_COOKIE_NAME]
  const body = req.body as UpdatePasswordBody

  if (!sessionId) {
    sendError({ message: 'No token provided', res, statusCode: 401 })
    return
  }

  if (body.newPassword !== body.confirmPassword) {
    sendError({
      message: 'The new password and confirm password do not match',
      res,
      statusCode: 400
    })
    return
  }

  try {
    const session = await readSession(sessionId)
    await user.updatePassword({
      ...body,
      userId: session.userId!
    })
    res.json({})
  } catch (e: any) {
    if (e.Id) {
      const error = e as M3ORequestError

      sendError({
        message:
          error.Detail === M3OErrors.IncorrectCurrentPassword
            ? 'The current password provided is incorrect'
            : error.Detail,
        statusCode: error.Code,
        res
      })
    }
  }
}

// async function sendVerificationEmail(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const body = req.body as SendVerificationEmailRequest
//   console.log('send verification email')
// }

async function verify(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as VerifyEmailRequest

  if (!body.token) {
    sendError({
      res,
      message: 'Please provide the verification token',
      statusCode: 400
    })

    return
  }

  try {
    const response = await user.verifyEmail(body)
    console.log(response)
  } catch (e: any) {
    if (e.Id) {
      const error = e as M3ORequestError

      sendError({
        res,
        message:
          error.Detail === M3OErrors.IncorrectVerifyToken
            ? 'Please provide a valid verification token'
            : error.Detail,
        statusCode: error.Code
      })
    }
    console.log(e)
  }
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
      return getLoggedInUser(req, res)
    }

    if (route === 'change-password' && method === Methods.Post) {
      return changePassword(req, res)
    }

    if (route === 'verify' && method === Methods.Post) {
      return verify(req, res)
    }

    // if (route === 'send-verification-email' && method === Methods.Post) {
    //   return sendVerificationEmail(req, res)
    // }

    return sendError({ message: 'Method not allowed', res, statusCode: 405 })
  }
}
