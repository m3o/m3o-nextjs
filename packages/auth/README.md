# @m3o/auth

The M3O Auth SDK is library for implementing authentication in your Next.js application.

Under the hood this library uses the [M3O User API](https://m3o.com/user). M3O provides simple and easy to use API's as building blocks for your API. For more information see [M3O](https://m3o.com)

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Server Setup](#server-setup)
  - [Client Setup](#client-setup)
- [SSG and authenticated routes](#ssg-and-authenticated-routes)
- [Server Side Authentication](#server-side-authentication)
- [Hooks](#hooks)
  - [useEmailLogin](#useEmailLogin)
  - [useLogout](#useLogout)
  - [useSignUp](#useSignUp)
  - [useSendResetPasswordEmail](#useSendResetPasswordEmail)
  - [useResetPassword](#useResetPassword)

## Installation

`npm install @m3o/auth` or `yarn add @m3o/auth`

## Getting Started

To use this package you'll need to make sure that you have an [M3O](https://m3o.com) API Key.

Once created, add the key to your `.env.local`:

`M3O_KEY=xxxxx`

#### Server setup

Firstly, you'll need to create a file which will bootstrap the APIs calls needed for authentication. [More information on catch-all routing](https://nextjs.org/docs/api-routes/dynamic-api-routes#optional-catch-all-api-routes).

- Create a folder in `pages/api` called `/user`.
- Create a file called `[...m3oUser].js` or `.ts` if you're a Typescript user within this folder.

Within this created file you can now call the `handleAuth` method supplied by `@m3o/auth`:

```javascript
import { handleAuth } from '@m3o/auth'

export default handleAuth()
```

This will setup these handlers:

- `POST: api/user/login` - This will handle the users login and session creation.
- `POST: api/user/logout` - This will logout the user on M3O and also destroy the local session.
- `POST: api/user/sign-up` - This is the route that a new user details will need to be posted to to create a new user.
- `GET: api/user/me` - This is the route for returning the current logged in user.
- `POST: api/user/send-password-reset-email` - When the user needs to reset their password this is the route to call. This will send them a code to be able to reset their password.
- `POST: api/user/reset-password` - This is the POST to send the users new password and the code from the `send-password-reset-email` request.

#### Client setup

Within your `_app.jsx` you will need to import our `<UserProvider />` component. This will handle your authentication state:

```typescript
import { UserProvider } from '@m3o/auth'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
```

If you use the `withAuth` `getServerSideProps` wrapper on any of your pages, then you can pass the `user` from the `pageProps` straight to the `UserProvider`. This means that the user will be available on the state (when logged in) on first load.

### SSG and authenticated routes

Static Site Generation allows your application to be hosted on a CDN which makes for rapid loading speeds. When using SSG, you will not be authenticating the user on the server before the page loads. This means, the client will handle the authentication. This allows us to show a loader prior whilst the client is authenticating.

Below, is a basic example of how to block the user until they are authenticated by the M3O user service.

```tsx
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@m3o/auth'

const PrivateClient: NextPage = () => {
  const { user, isAuthenticating } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticating && !user) {
      router.push('/')
    }
  }, [isAuthenticating, user])

  if (isAuthenticating) {
    return <p>Loading...</p>
  }

  return <div>{user ? 'Authenticated' : null}</div>
}
```

### Server Side Authentication

By wrapping your `getServerSideProps` call with the `withAuth` wrapper we're able to authenticate the user on the server prior to the webpage loading. By doing this you will be opting in to Server side rendering, which has speed costs.

```typescript
import type { NextPage } from 'next'
import { withAuth } from '@m3o/auth'

interface Props {
  test: string
}

export const getServerSideProps = withAuth<Props>({
  redirectOnAuthFailure: true,
  // Not required, just here as an example.
  onAuthentication() {
    return {
      props: {
        test: 'test'
      }
    }
  }
})

const PrivateServerProtected: NextPage = () => {
  return <div>Private</div>
}

export default PrivateServerProtected
```

## Hooks

### useEmailLogin

This hook handles the user login. Once the call is successful, the user will be logged in until the user logs out.

```tsx
import { useEmailLogin } from '@m3o/auth'

function Login() {
  const { login } = useEmailLogin({
    onSuccess: () => {
      // handle the success call
    }
  })

  // In the real world these values will come from the form fields
  return (
    <form
      onSubmit={() => login({ email: 'test@test.com', password: 'password' })}
    ></form>
  )
}
```

### useLogout

This hook handles the user logout. This will logout the user on the server and with m3o.

```tsx
import { useLogout } from '@m3o/auth'

function MyPage() {
  const { logout } = useLogout({
    onSuccess: () => {
      // Do something on success.
    }
  })

  return <button onClick={logout}>Logout</button>
}
```

### useSignUp

This hook allows the user to sign up with their email address. For more information on what data you can use to sign up a user please see [M3O User API](https://m3o.com/user).

```tsx
import { useSignUp } from '@m3o/auth'

function SignUp() {
  const { signUp, error } = useSignUp({
    onSuccess: () => {
      // Do something on success.
    }
  })

  // In the real world these values will come from the form fields
  return (
    <form
      onSubmit={() =>
        signUp({
          email: 'test@email.com',
          password: 'password',
          // optional fields
          profile: {
            firstName: 'Darth',
            lastName: 'Vader'
          }
        })
      }
    >
      Sign Up
    </form>
  )
}
```

### useSendResetPasswordEmail

This hook provides the functionality to send the user a code to reset their password. Once the email is received the user can then enter their code to reset their password.

```tsx
import { useSendResetPasswordEmail } from '@m3o/auth'

function SendResetPasswordEmail() {
  const { sendResetPasswordEmail } = useSendResetPasswordEmail({
    onSuccess: () => {
      // Do something on success.
    }
  })
  return (
    <button onClick={sendResetPasswordEmail}>
      Forgot password?
    </form>
  )
}
```

### useResetPassword

This hook provides the functionality for the user to reset their password. Here they post the code that is received from the previous hook

```tsx
import { useResetPassword } from '@m3o/auth'

function ResetPassword() {
  const { resetPassword } = useResetPassword({
    email: 'test@email.com'
  })

  return (
    <form
      onSubmit={() =>
        resetPassword({
          code: 'xxxxx-xxxx-xxxxxx',
          confirmPassword: 'password',
          newPassword: 'password'
        })
      }
    >
      Reset password
    </form>
  )
}
```
