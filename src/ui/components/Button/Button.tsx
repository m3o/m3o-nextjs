import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import classnames from 'classnames'
import { Loader } from './Loader'

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  className?: string
  isLoading?: boolean
}

export function Button({
  children,
  className,
  isLoading = false
}: ButtonProps): ReactElement {
  const classes = classnames(className, 'm3o-button')

  return (
    <button className={classes}>{isLoading ? <Loader /> : children}</button>
  )
}
