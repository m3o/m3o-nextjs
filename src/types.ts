import type { NextApiResponse } from 'next'

export interface SendError {
  message: string
  res: NextApiResponse
  statusCode: number
}

export interface M3ORequestError {
  Id: string
  Code: number
  Detail: string
  Status: string
}

export interface RequestError {
  error: { message: string }
}
