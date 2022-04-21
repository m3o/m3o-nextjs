# M3O Authentication for Next.js

This project provides quick and easy authentication for Next.js. Under the hood, the package use of the [M3O User API](https://m3o.com/user). The package provides the server routing and user state management for the UI.

## Getting Started

Please make sure that you have created an API Key on [M3O.com](https://m3o.com). Once created this key please add to your `.env.local` of `.env` file within your project:

`M3O_KEY=xxxxx`

### API routes / handlers

You need to create the a file that will bootstrap all your user route handling on the server. Within the `pages/api` folder create a file under the user folder called `[...m3oUser].(ts|js)`. e.g `pages/api/user/[...m3oUser].js`.

Once this file is setup we now need to call the function that will create the all the authentication handling on your API:

```javascript
import { handleAuth } from '@m3o/auth'

export default handleAuth()
```

This will setup these handlers:

- `POST: api/user/login`
- `POST: api/user/logout`
- `POST: api/user/sign-up`
- `GET: api/user/me`
- `POST: api/user/reset-password`

### Client

On the client we provide useful hooks and providers to integrate with the M3O User API.

Within your `_app.(tsx|jsx)` you will need to import our `<UserProvider />` component. This will handle your authentication state:

```typescript
import { UserProvider } from '@m3o/auth'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const { user } = pageProps

  return (
    <UserProvider user={user}>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
```

By providing the user to `<UserProvider />`, we're able to share the user across the application without the need to add this to each layout.

### SSG and authenticated routes

Static Site Generation allows your application to be hosted on a CDN which makes for rapid loading speeds. When using SSG, you will not be authenticating the user on the server before the page loads. This means, the client will handle the authentication. This allows us to show a loader prior whilst the client is authenticating.

Below, is a basic example of how to block the user until they are authenticated by the M3O user service.

```typescript
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

```typescript
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

```typescript
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

```typescript
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
