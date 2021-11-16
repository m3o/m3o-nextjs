import React, { PropsWithChildren, ReactElement } from 'react'
import classnames from 'classnames'

export type ErrorAlertProps = PropsWithChildren<{
  className?: string
}>

export function ErrorAlert({
  children,
  className
}: ErrorAlertProps): ReactElement {
  const classes = classnames('m3o-error-alert', className)

  return (
    <div className={classes}>
      <strong>ERROR:</strong> {children}
    </div>
  )
}
