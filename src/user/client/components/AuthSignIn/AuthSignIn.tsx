import React, { ReactElement, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import classnames from 'classnames'
import { FormInput } from '../../../../ui/components/FormInput'
import { Button } from '../../../../ui/components/Button'
import styles from './AuthSignIn.module.css'
import { useEmailLogin } from '../../hooks/use-email-login'
import { ErrorAlert } from '../../../../ui/components/ErrorAlert'
import { Card } from '../../../../ui/components/Card'

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
}

type AuthSignInFields = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please provide a valid email address')
    .required('Please provide a valid email address'),
  password: yup.string().required('Please provide a password')
})

export function AuthSignIn({
  className,
  emailDefaultValue = '',
  emailLabel = 'Email',
  emailPlaceholder = 'Please provide your email address',
  noAccountText = "Don't have an account?",
  onSuccessfulLogin,
  passwordDefaultValue = '',
  passwordLabel = 'Password',
  passwordPlaceholder = 'Please provide your password',
  title = 'Sign in',
  signUpUrl = '/sign-up',
  signUpButtonText = 'Register now',
  subTitle = ''
}: AuthSignInProps): ReactElement {
  const classes = classnames(className)

  const { control, handleSubmit } = useForm<AuthSignInFields>({
    defaultValues: {
      email: emailDefaultValue,
      password: passwordDefaultValue
    },
    resolver: yupResolver(schema)
  })

  const { login, isLoading, error } = useEmailLogin()

  const onSubmit = useCallback(async (values: AuthSignInFields) => {
    try {
      await login(values)
      onSuccessfulLogin()
    } catch (e) {}
  }, [])

  return (
    <Card className={classes}>
      <h1 className={styles.title}>{title}</h1>
      {subTitle && <h2 className={styles.subTitle}>{subTitle}</h2>}
      {error && <ErrorAlert className={styles.error}>{error}</ErrorAlert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => (
            <FormInput
              {...field}
              label={emailLabel}
              placeholder={emailPlaceholder}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => (
            <FormInput
              {...field}
              label={passwordLabel}
              type="password"
              placeholder={passwordPlaceholder}
              error={fieldState.error?.message}
            />
          )}
        />
        <Button type="submit" className={styles.button} isLoading={isLoading}>
          Submit
        </Button>
      </form>
      <p className={styles.accountText}>
        {noAccountText}{' '}
        <Link href={signUpUrl}>
          <a className={styles.registerButton}>{signUpButtonText}</a>
        </Link>
      </p>
    </Card>
  )
}
