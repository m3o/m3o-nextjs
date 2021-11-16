import type { SendError, M3ORequestError } from '../types'

export function sendError({ message, res, statusCode }: SendError): void {
  res.status(statusCode).send({ error: { message } })
}

export const isM3ORequestError = (
  e: string | M3ORequestError
): e is M3ORequestError => (e as M3ORequestError).Id !== undefined
