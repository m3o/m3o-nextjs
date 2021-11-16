import React, { ReactElement, useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Link from 'next/link'
import classnames from 'classnames'
import { Button } from '../../../../ui/components/Button'
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
  forgottenPasswordLink?: string
  forgottenPasswordLinkText?: string
  noAccountText?: string
  passwordDefaultValue?: string
  passwordLabel?: string
  passwordPlaceholder?: string
  onSuccessfulLogin: VoidFunction
  showForgottenPasswordLink?: boolean
  signUpUrl?: string
  signUpButtonText?: string
  signUpLinkTestId?: string
  subTitle?: string
  submitButtonLabel?: string
  submitButtonTestId?: string
  title?: string
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
  forgottenPasswordLink = '/reset-password',
  forgottenPasswordLinkText = 'Forgotten password?',
  noAccountText = "Don't have an account?",
  onSuccessfulLogin,
  passwordDefaultValue = '',
  passwordLabel,
  passwordPlaceholder,
  title = 'Sign in',
  showForgottenPasswordLink = true,
  signUpUrl = '/sign-up',
  signUpButtonText = 'Register now',
  signUpLinkTestId = 'sign-up-link',
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
      {subTitle && <h2 className="m3o-auth-sign-in-sub-title">{subTitle}</h2>}
      {error && (
        <ErrorAlert className="m3o-auth-sign-in-error">{error}</ErrorAlert>
      )}
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
            className="m3o-auth-sign-in-button"
            isLoading={isLoading}
            testId={submitButtonTestId}
          >
            {submitButtonLabel}
          </Button>
        </form>
      </FormProvider>
      <p className="m3o-auth-sign-in-account-text">
        {noAccountText}{' '}
        <Link href={signUpUrl}>
          <a
            className="m3o-auth-sign-in-register-button"
            data-testid={signUpLinkTestId}
          >
            {signUpButtonText}
          </a>
        </Link>
      </p>
      {showForgottenPasswordLink && (
        <p className="m3o-auth-sign-in-forgotten-password">
          <Link href={forgottenPasswordLink}>
            <a>{forgottenPasswordLinkText}</a>
          </Link>
        </p>
      )}
    </Card>
  )
}
