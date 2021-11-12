import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import classnames from 'classnames'
import styles from './FormInput.module.css'

export type FormInputProps = ComponentPropsWithoutRef<'input'> & {
  className?: string
  error?: string
  label: string
}

export function FormInput({
  className,
  error = '',
  label,
  name,
  ...props
}: FormInputProps): ReactElement {
  const classes = classnames(styles.root, className, {
    [styles.hasError]: !!error
  })

  return (
    <div className={classes}>
      <label htmlFor={name}>{label}</label>
      <input name={name} {...props} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
