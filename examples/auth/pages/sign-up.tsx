import React from 'react'
import {
  AuthSignUp,
  AuthFirstNameField,
  AuthLastNameField,
  AuthEmailField,
  AuthPasswordField
} from '@m3o/nextjs'
import { Layout } from '../components/Layout'

export default function SignUp() {
  return (
    <Layout>
      <AuthSignUp onSignUp={() => console.log('Signed up')}>
        <AuthFirstNameField />
        <AuthLastNameField />
        <AuthEmailField />
        <AuthPasswordField />
      </AuthSignUp>
    </Layout>
  )
}
