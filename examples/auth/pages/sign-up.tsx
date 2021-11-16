import React from 'react'
import { useRouter } from 'next/router'
import {
  AuthSignUp,
  AuthFirstNameField,
  AuthLastNameField,
  AuthEmailField,
  AuthPasswordField
} from '@m3o/nextjs'
import { Layout } from '../components/Layout'

export default function SignUp() {
  const router = useRouter()

  return (
    <Layout>
      <AuthSignUp onSignUp={() => router.push('/')}>
        <AuthFirstNameField />
        <AuthLastNameField />
        <AuthEmailField />
        <AuthPasswordField />
      </AuthSignUp>
    </Layout>
  )
}
