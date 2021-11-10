import type { M3ORequestError } from '../../../types'

export const isM3ORequestError = (
  e: string | M3ORequestError
): e is M3ORequestError => (e as M3ORequestError).Id !== undefined
