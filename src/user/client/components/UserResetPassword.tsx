import type { ReactElement } from 'react'
import React, { useState } from 'react'
import { UserResetPasswordEmailForm } from './UserResetPasswordEmailForm'
import { UserResetPasswordUpdatePasswordForm } from './UserResetPasswordUpdatePasswordForm'
import { Card } from '../../../ui/components/Card'

export function UserResetPassword(): ReactElement {
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState('')

  const onSuccess = (email: string) => {
    setEmail(email)
    setEmailSent(true)
  }

  return (
    <Card title="Reset Password">
      {emailSent ? (
        <UserResetPasswordUpdatePasswordForm email={email} />
      ) : (
        <UserResetPasswordEmailForm onSuccess={onSuccess} />
      )}
    </Card>
  )
}
