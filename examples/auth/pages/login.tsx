import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { AuthSignIn } from '@m3o/nextjs'
import { Layout } from '../components/Layout'

export default function Login(): ReactElement {
  const router = useRouter()

  return (
    <Layout>
      <div style={{ paddingTop: 40 }}>
        <AuthSignIn
          subTitle="This is an example of how to use the M3O auth components"
          onSuccessfulLogin={() => router.push('/')}
          submitButtonTestId="submit-button"
        />
      </div>
    </Layout>
  )
}
