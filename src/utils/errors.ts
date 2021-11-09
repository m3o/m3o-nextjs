import type { SendError } from '../types'

export function sendError({ message, res, statusCode }: SendError): void {
  res.status(statusCode).send({ error: { message } })
}
