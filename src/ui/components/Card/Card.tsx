import React, { PropsWithChildren, ReactElement } from 'react'
import classnames from 'classnames'
import styles from './Card.module.css'

type CardProps = PropsWithChildren<{
  className?: string
}>

export function Card({ children, className }: CardProps): ReactElement {
  const classes = classnames(styles.root, className)
  return <div className={classes}>{children}</div>
}
