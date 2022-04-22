# M3O Nextjs

The M3O Next.js SDK

## Overview

M3O Next.js provides the code to integrate the M3O APIs as quickly as possible.

## Packages

### @m3o/auth

This package allows you to easily add authentication in your Next.js project. Under the hood this pacakge uses the [M3O User](https://m3o.com/user) service and works on both SSR and SSG projects.

### Installation

`npm install @m3o/auth` or `yarn add @m3o/auth`

### Setup

Firstly, you will need to setup your API server. Create an API file called `[...m3oUser].js` in the `pages/api/user/` folder.

```javascript
import { handleAuth } from '@m3o/auth'

export default handleAuth()
```

Now you will need to setup the client

```javascript
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

Setup complete! Now you're ready to go. For full documentation please see:

[packages/auth/README.md](packages/auth/README.md)
