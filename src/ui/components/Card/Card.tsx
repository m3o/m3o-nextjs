import React, { PropsWithChildren, ReactElement } from 'react'
import classnames from 'classnames'
import styles from './Card.module.css'

type CardProps = PropsWithChildren<{
  className?: string
  title: string
}>

export function Card({ children, className, title }: CardProps): ReactElement {
  const classes = classnames(styles.root, className)

  return (
    <div className={classes}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  )
}
