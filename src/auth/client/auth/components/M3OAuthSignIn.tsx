import React, { ReactElement } from 'react'
import styles from './M3OAuthSignIn.module.css'

interface M3OAuthSignInProps {
  title?: string
}

export function M3OAuthSignIn({ title }: M3OAuthSignInProps): ReactElement {
  return (
    <div className={styles.root}>
      adasdsadasds
      <h1>{title}</h1>
    </div>
  )
}
