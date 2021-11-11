import React, { ReactElement, useCallback, FormEvent, useRef } from 'react'

export function LoginForm(): ReactElement {
  const emailFieldRef = useRef<HTMLInputElement>(null)
  const passwordFieldRef = useRef<HTMLInputElement>(null)

  const onSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()
  }, [])

  return <form onSubmit={onSubmit}></form>
}
