import React, { ReactElement, useCallback, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Account } from 'm3o/user'
import classnames from 'classnames'
import { FormInput } from '../FormInput'
import { Button } from '../Button'
import styles from './AuthSignIn.module.css'
import { useEmailLogin } from '../../hooks/use-email-login'
import { ErrorAlert } from '../ErrorAlert'

export interface AuthSignInProps {
  className?: string
  emailDefaultValue?: string
  emailLabel?: string
  emailPlaceholder?: string
  passwordDefaultValue?: string
  passwordLabel?: string
  passwordPlaceholder?: string
  onSuccessfulLogin: VoidFunction
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
  emailDefaultValue = '',
  emailLabel = 'Email',
  emailPlaceholder = 'Please provide your email address',
  onSuccessfulLogin,
  passwordDefaultValue = '',
  passwordLabel = 'Password',
  passwordPlaceholder = 'Please provide your password',
  title = 'Sign in',
  subTitle = ''
}: AuthSignInProps): ReactElement {
  const classes = classnames(styles.root, classnames)

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
    <div className={classes}>
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
        Don't have an account?{' '}
        <button className={styles.registerButton}>Register now</button>
      </p>
    </div>
  )
}
