import React, { ReactElement, useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Link from 'next/link'
import classnames from 'classnames'
import { Button } from '../../../../ui/components/Button'
import styles from './AuthSignIn.module.css'
import { useEmailLogin } from '../../hooks/useEmailLogin'
import { ErrorAlert } from '../../../../ui/components/ErrorAlert'
import { Card } from '../../../../ui/components/Card'
import { AuthEmailField } from '../AuthEmailField'
import { AuthPasswordField } from '../AuthPasswordField'

export interface AuthSignInProps {
  className?: string
  emailDefaultValue?: string
  emailLabel?: string
  emailPlaceholder?: string
  noAccountText?: string
  passwordDefaultValue?: string
  passwordLabel?: string
  passwordPlaceholder?: string
  onSuccessfulLogin: VoidFunction
  signUpUrl?: string
  signUpButtonText?: string
  title?: string
  subTitle?: string
  submitButtonLabel?: string
  submitButtonTestId?: string
}

type AuthSignInFields = {
  email: string
  password: string
}

export function AuthSignIn({
  className,
  emailDefaultValue = '',
  emailLabel,
  emailPlaceholder,
  noAccountText = "Don't have an account?",
  onSuccessfulLogin,
  passwordDefaultValue = '',
  passwordLabel,
  passwordPlaceholder,
  title = 'Sign in',
  signUpUrl = '/sign-up',
  signUpButtonText = 'Register now',
  submitButtonLabel = 'Submit',
  submitButtonTestId,
  subTitle = ''
}: AuthSignInProps): ReactElement {
  const classes = classnames(className)
  const formMethods = useForm<AuthSignInFields>()
  const { login, isLoading, error } = useEmailLogin()

  const onSubmit = useCallback(async (values: AuthSignInFields) => {
    try {
      await login(values)
      onSuccessfulLogin()
    } catch (e) {}
  }, [])

  return (
    <Card className={classes} title={title}>
      {subTitle && <h2 className={styles.subTitle}>{subTitle}</h2>}
      {error && <ErrorAlert className={styles.error}>{error}</ErrorAlert>}
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <AuthEmailField
            label={emailLabel}
            placeholder={emailPlaceholder}
            defaultValue={emailDefaultValue}
          />
          <AuthPasswordField
            defaultValue={passwordDefaultValue}
            label={passwordLabel}
            placeholder={passwordPlaceholder}
          />
          <Button
            type="submit"
            className={styles.button}
            isLoading={isLoading}
            testId={submitButtonTestId}
          >
            {submitButtonLabel}
          </Button>
        </form>
      </FormProvider>
      <p className={styles.accountText}>
        {noAccountText}{' '}
        <Link href={signUpUrl}>
          <a className={styles.registerButton}>{signUpButtonText}</a>
        </Link>
      </p>
    </Card>
  )
}
