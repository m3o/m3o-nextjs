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

  const json = await response.json()

  if (!response.ok) {
    return Promise.reject(json)
  }

  return json as R
}
