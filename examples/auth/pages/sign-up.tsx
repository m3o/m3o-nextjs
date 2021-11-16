import React from 'react'
import { useRouter } from 'next/router'
import {
  UserSignUp,
  UserFirstNameField,
  UserLastNameField,
  UserEmailField,
  UserPasswordField
} from '@m3o/nextjs'
import { Layout } from '../components/Layout'

export default function SignUp() {
  const router = useRouter()

  return (
    <Layout>
      <UserSignUp onSignUp={() => router.push('/')}>
        <UserFirstNameField />
        <UserLastNameField />
        <UserEmailField />
        <UserPasswordField />
      </UserSignUp>
    </Layout>
  )
}
