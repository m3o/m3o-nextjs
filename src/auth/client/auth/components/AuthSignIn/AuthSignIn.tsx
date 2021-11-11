import React, { ReactElement, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import classnames from 'classnames'
import { FormInput } from '../FormInput'
import { Button } from '../Button'
import styles from './AuthSignIn.module.css'
import { useAuth } from '..'

export interface AuthSignInProps {
  className?: string
  emailDefaultValue?: string
  emailLabel?: string
  emailPlaceholder?: string
  passwordDefaultValue?: string
  passwordLabel?: string
  passwordPlaceholder?: string
  title?: string
  subTitle?: string
}

interface AuthSignUpFields {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required()
})

export function AuthSignIn({
  emailDefaultValue = '',
  emailLabel = 'Email',
  emailPlaceholder = 'Please provide your email address',
  passwordDefaultValue = '',
  passwordLabel = 'Password',
  passwordPlaceholder = 'Please provide your password',
  title = 'Sign in',
  subTitle = ''
}: AuthSignInProps): ReactElement {
  const classes = classnames(styles.root, classnames)

  const { control, handleSubmit } = useForm<AuthSignUpFields>({
    defaultValues: {
      email: emailDefaultValue,
      password: passwordDefaultValue
    },
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback(() => {
    console.log('submitting')
  }, [])

  return (
    <div className={classes}>
      <h1 className={styles.title}>{title}</h1>
      {subTitle && <h2 className={styles.subTitle}>{subTitle}</h2>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <FormInput
              {...field}
              label={emailLabel}
              placeholder={emailPlaceholder}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <FormInput
              {...field}
              label={passwordLabel}
              type="password"
              placeholder={passwordPlaceholder}
            />
          )}
        />
        <Button type="submit" className={styles.button}>
          Submit
        </Button>
        <p className={styles.accountText}>
          Don't have an account?{' '}
          <button className={styles.registerButton}>Register now</button>
        </p>
      </form>
    </div>
  )
}
