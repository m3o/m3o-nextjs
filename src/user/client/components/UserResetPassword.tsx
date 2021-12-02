import type { ReactElement } from 'react'
import React, { useState } from 'react'
import { UserResetPasswordEmailForm } from './UserResetPasswordEmailForm'
import { UserResetPasswordUpdatePasswordForm } from './UserResetPasswordUpdatePasswordForm'
import { Card } from '../../../ui/components/Card'

interface UserResetPasswordProps {
  className?: string
  onResetPassword: VoidFunction
}

export function UserResetPassword({
  className,
  onResetPassword
}: UserResetPasswordProps): ReactElement {
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState('')

  const onSuccess = (email: string) => {
    setEmail(email)
    setEmailSent(true)
  }

  return (
    <Card title="Reset Password" className={className}>
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
