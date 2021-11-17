import type { ReactElement } from 'react'
import React from 'react'
import { UserResetPassword } from '@m3o/nextjs'
import { Layout } from '../components/Layout'

export default function ResetPassword(): ReactElement {
  return (
    <Layout>
      <UserResetPassword />
    </Layout>
  )
}
