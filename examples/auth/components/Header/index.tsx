import React from 'react'
import Link from 'next/link'
import { useAuth, useLogout } from '@m3o/nextjs'
import styles from './Header.module.css'

export function Header() {
  const { user, isAuthenticating } = useAuth()
  const { logout } = useLogout()

  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <h1>Auth Example</h1>
        {isAuthenticating ? (
          <p>Loading...</p>
        ) : (
          <div>
            {user ? (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            ) : (
              <Link href="/login">
                <a className="btn">Login</a>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
