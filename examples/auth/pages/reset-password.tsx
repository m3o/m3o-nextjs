import type { ReactElement } from 'react'
import { useRouter } from 'next/router'
import React from 'react'
import { UserResetPassword } from '@m3o/nextjs'
import { Layout } from '../components/Layout'

export default function ResetPassword(): ReactElement {
  const router = useRouter()

  return (
    <Layout>
      <UserResetPassword onResetPassword={() => router.push('/login')} />
    </Layout>
  )
}
