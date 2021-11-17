import type { ReactElement } from 'react'
import type { ResetPasswordRequest } from 'm3o/user'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { UserPasswordCodeField } from './UserPasswordCodeField'
import { UserPasswordField } from './UserPasswordField'
import { Button } from '../../../ui/components/Button'
import { useResetPassword } from '../hooks/useResetPassword'
import { ErrorAlert } from '../../../ui/components/ErrorAlert'

interface UserResetPasswordUpdatePasswordFormProps {
  email: string
}

export function UserResetPasswordUpdatePasswordForm({
  email
}: UserResetPasswordUpdatePasswordFormProps): ReactElement {
  const formMethods = useForm<ResetPasswordRequest>()
  const { resetPassword, isLoading, error } = useResetPassword(email)

  return (
    <>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(resetPassword)}>
          <UserPasswordCodeField />
          <UserPasswordField
            name="newPassword"
            label="New Password"
            placeholder="Please provide your new password"
          />
          <UserPasswordField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Please confirm your new password"
          />
          <Button testId="reset-update-password-submit" isLoading={isLoading}>
            Submit
          </Button>
        </form>
      </FormProvider>
    </>
  )
}
