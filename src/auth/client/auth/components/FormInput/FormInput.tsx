import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import styles from './FormInput.module.css'

export type FormInputProps = ComponentPropsWithoutRef<'input'> & {
  label: string
}

export function FormInput({
  label,
  name,
  ...props
}: FormInputProps): ReactElement {
  return (
    <div className={styles.root}>
      <label htmlFor={name}>{label}</label>
      <input name={name} {...props} />
    </div>
  )
}
