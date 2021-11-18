import type { ReactElement } from 'react'
import React, { useState } from 'react'
import { UserResetPasswordEmailForm } from './UserResetPasswordEmailForm'
import { UserResetPasswordUpdatePasswordForm } from './UserResetPasswordUpdatePasswordForm'
import { Card } from '../../../ui/components/Card'

interface UserResetPasswordProps {
  onResetPassword: VoidFunction
}

export function UserResetPassword({
  onResetPassword
}: UserResetPasswordProps): ReactElement {
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState('')

  const onSuccess = (email: string) => {
    setEmail(email)
    setEmailSent(true)
  }

  return (
    <Card title="Reset Password">
      {emailSent ? (
        <UserResetPasswordUpdatePasswordForm
          email={email}
          onResetPassword={onResetPassword}
        />
      ) : (
        <UserResetPasswordEmailForm onSuccess={onSuccess} />
      )}
    </Card>
  )
}
