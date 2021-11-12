import React, { PropsWithChildren, ReactElement } from 'react'
import classnames from 'classnames'
import styles from './ErrorAlert.module.css'

export type ErrorAlertProps = PropsWithChildren<{
  className?: string
}>

export function ErrorAlert({
  children,
  className
}: ErrorAlertProps): ReactElement {
  const classes = classnames(styles.root, className)

  return (
    <div className={classes}>
      <strong>ERROR:</strong> {children}
    </div>
  )
}
