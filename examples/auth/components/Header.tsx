import React from 'react'
import Link from 'next/link'
import { useAuth, useLogout } from '@m3o/nextjs'

export function Header() {
  const { user, isAuthenticating } = useAuth()
  const { logout } = useLogout()

  return (
    <>
      <header className="header">
        <div className="container flex header-container">
          <h1 className="title">
            <Link href="/">
              <a>Auth Example</a>
            </Link>
          </h1>
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
      <style jsx>{`
        .header {
          padding: 1.5rem;
          border-bottom: 1px solid #dedede;
          background: white;
        }

        .header-container {
          justify-content: space-between;
          align-items: center;
        }

        .title {
          font-size: 1rem;
        }
      `}</style>
    </>
  )
}
