import React from 'react'
import { M3OAuthSignIn } from '@m3o/nextjs'
import { Layout } from '../components/Layout'

export default function Login() {
  return (
    <Layout>
      <M3OAuthSignIn />
    </Layout>
  )
}
