import type { NextApiRequest, NextApiResponse } from 'next'
import type { UpdatePasswordRequest } from 'm3o/user'
import type { M3ORequestError } from '../../../../types'
import { CONFIG } from '../../../../config'
import { sendError } from '../../../../utils/errors'
import { readSession } from '../utils'
import { user } from '../../../../services'
type UpdatePasswordBody = Omit<UpdatePasswordRequest, 'userId'>

enum M3OErrors {
  IncorrectCurrentPassword = 'crypto/bcrypt: hashedPassword is not the hash of the given password'
}

export async function changePassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cookies } = req
  const sessionId: string | undefined = cookies[CONFIG.USER_COOKIE_NAME]
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
