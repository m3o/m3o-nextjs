import type { ReactElement } from 'react'
import type { ResetPasswordRequest } from 'm3o/user'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { UserPasswordCodeField } from './UserPasswordCodeField'
import { UserPasswordField } from './UserPasswordField'
import { Button } from '../../../ui/components/Button'
import useResetPassword from '../hooks/useResetPassword'
import { ErrorAlert } from '../../../ui/components/ErrorAlert'

interface UserResetPasswordUpdatePasswordFormProps {
  confirmPasswordLabel?: string
  confirmPasswordPlaceholder?: string
  email: string
  errorBannerTestId?: string
  newPasswordLabel?: string
  newPasswordPlaceholder?: string
  onResetPassword: VoidFunction
  submitButtonTestId?: string
  submitButtonLabel?: string
}

export function UserResetPasswordUpdatePasswordForm({
  confirmPasswordLabel = 'Confirm Password',
  confirmPasswordPlaceholder = 'Please confirm your new password',
  email,
  errorBannerTestId = 'reset-password-error',
  newPasswordLabel = 'New Password',
  newPasswordPlaceholder = 'Please provide your new password',
  onResetPassword,
  submitButtonTestId = 'reset-update-password-submit',
  submitButtonLabel = 'Submit'
}: UserResetPasswordUpdatePasswordFormProps): ReactElement {
  const formMethods = useForm<ResetPasswordRequest>()
  const { resetPassword, isLoading, error } = useResetPassword({
    email,
    onSuccess: onResetPassword
  })

  return (
    <>
      {error && <ErrorAlert testId={errorBannerTestId}>{error}</ErrorAlert>}
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(resetPassword)}>
          <UserPasswordCodeField />
          <UserPasswordField
            name="newPassword"
            label={newPasswordLabel}
            placeholder={newPasswordPlaceholder}
          />
          <UserPasswordField
            name="confirmPassword"
            label={confirmPasswordLabel}
            placeholder={confirmPasswordPlaceholder}
          />
          <Button testId={submitButtonTestId} isLoading={isLoading}>
            {submitButtonLabel}
          </Button>
        </form>
      </FormProvider>
    </>
  )
}
