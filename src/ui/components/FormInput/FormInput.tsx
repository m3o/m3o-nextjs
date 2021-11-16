import React, { ComponentPropsWithRef, forwardRef } from 'react'
import classnames from 'classnames'
import styles from './FormInput.module.css'

export type FormInputProps = ComponentPropsWithRef<'input'> & {
  className?: string
  error?: string
  errorTestId?: string
  label: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, error = '', label, name, errorTestId, ...props }, ref) => {
    const classes = classnames(styles.root, className, {
      [styles.hasError]: !!error
    })

    return (
      <div className={classes}>
        <label htmlFor={name}>{label}</label>
        <input name={name} {...props} ref={ref} />
        {error && (
          <p className={styles.error} data-testid={errorTestId}>
            {error}
          </p>
        )}
      </div>
    )
  }
)
