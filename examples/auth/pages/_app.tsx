import type { AppProps } from 'next/app'
import { AuthProvider } from '@m3o/nextjs'

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = pageProps

  return (
    <AuthProvider user={user}>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
