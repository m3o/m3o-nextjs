import { RequestError } from '../types'

export async function post<
  D extends Record<string, unknown>,
  R extends Record<string, unknown>
>(url: string, data?: D): Promise<R> {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data || {}),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
    return response.json()
  }

  throw ((await response.json()) as RequestError).error
}
