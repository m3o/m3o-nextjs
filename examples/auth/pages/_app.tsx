import type { AppProps } from 'next/app'
import { UserProvider } from '@m3o/nextjs/user'
import '../styles/globals.css'
import '@m3o/nextjs/m3o-next.css'

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = pageProps

  return (
    <UserProvider user={user}>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
