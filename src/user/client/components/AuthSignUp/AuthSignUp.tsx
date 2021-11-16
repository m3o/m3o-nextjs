import React, { ReactElement, PropsWithChildren, useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { CreateRequest } from 'm3o/user'
import { Card } from '../../../../ui/components/Card'
import { ErrorAlert } from '../../../../ui/components/ErrorAlert'
import { Button } from '../../../../ui/components/Button'
import { useSignUp } from '../..'
import styles from './AuthSignUp.module.css'

interface AuthSignUpProps {
  onSignUp: VoidFunction
  onSignUpError?: (error: string) => void
  submitButtonText?: string
  submitTestId?: string
  title?: string
}

export function AuthSignUp({
  children,
  onSignUp,
  onSignUpError,
  submitTestId = 'sign-up-button',
  submitButtonText = 'Submit',
  title = 'Sign up'
}: PropsWithChildren<AuthSignUpProps>): ReactElement {
  const { signUp, error, isLoading } = useSignUp()
  const formMethods = useForm<CreateRequest>()

  const onSubmit = useCallback(
    async (values: CreateRequest) => {
      try {
        await signUp(values)
        onSignUp()
      } catch (e) {
        if (onSignUpError) {
          onSignUpError(e as string)
        }
      }
    },
    [onSignUpError]
  )

  return (
    <Card title={title}>
      {error && <ErrorAlert className={styles.error}>{error}</ErrorAlert>}
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          {children}
          <Button
            type="submit"
            className={styles.button}
            isLoading={isLoading}
            testId={submitTestId}
          >
            {submitButtonText}
          </Button>
        </form>
      </FormProvider>
    </Card>
  )
}
