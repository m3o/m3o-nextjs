import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import classnames from 'classnames'
import styles from './Button.module.css'
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
  const classes = classnames(className, styles.root)

  return (
    <button className={classes}>{isLoading ? <Loader /> : children}</button>
  )
}
