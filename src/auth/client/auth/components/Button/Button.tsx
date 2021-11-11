import React, { ComponentPropsWithoutRef, ReactElement } from 'react'
import classnames from 'classnames'
import styles from './Button.module.css'

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  className?: string
}

export function Button({ children, className }: ButtonProps): ReactElement {
  const classes = classnames(className, styles.root)

  return <button className={classes}>{children}</button>
}
