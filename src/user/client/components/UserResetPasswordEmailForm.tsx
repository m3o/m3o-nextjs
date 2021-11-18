import type { ReactElement } from 'react'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import useSendResetPasswordEmail from '../hooks/useSendResetPasswordEmail'
import { UserEmailField } from '.'
import { Button } from '../../../ui/components/Button'
import { ErrorAlert } from '../../../ui/components/ErrorAlert'

interface UserResetPasswordEmailFormFields {
  email: string
}

interface UserResetPasswordEmailFormProps {
  onSuccess: (email: string) => void
  formTestId?: string
  submitTestId?: string
}

export function UserResetPasswordEmailForm({
  formTestId = 'reset-password-email-form',
  onSuccess,
  submitTestId = 'reset-password-submit-button'
}: UserResetPasswordEmailFormProps): ReactElement {
  const formMethods = useForm<UserResetPasswordEmailFormFields>()

  const {
    sendResetPasswordEmail,
    error: sendResetPasswordEmailError,
    isLoading
  } = useSendResetPasswordEmail({
    onSuccess
  })

  return (
    <>
      {sendResetPasswordEmailError && (
        <ErrorAlert>{sendResetPasswordEmailError}</ErrorAlert>
      )}
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(sendResetPasswordEmail)}
          data-testid={formTestId}
        >
          <UserEmailField />
          <Button testId={submitTestId} isLoading={isLoading}>
            Submit
          </Button>
        </form>
      </FormProvider>
    </>
  )
}
