import React from 'react'
import { AuthSignIn } from '@m3o/nextjs'
import { Layout } from '../components/Layout'

export default function Login() {
  return (
    <Layout>
      <AuthSignIn subTitle="This is an example of how to use the M3O auth components" />
    </Layout>
  )
}
