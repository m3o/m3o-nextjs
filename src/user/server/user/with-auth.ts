import type { Account } from 'm3o/user'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { user } from '../../../services'

export interface WithAuthProps {
  user: Account | null
}

interface WithAuth extends GetServerSidePropsContext {
  req: GetServerSidePropsContext['req'] & { user: Account | null }
}

type Handler = (args: WithAuth) => ReturnType<GetServerSideProps>

export function withAuth(fn: Handler) {
  return async (context: GetServerSidePropsContext) => {
    let account: Account | null = null

    const { cookies } = context.req

    try {
      // If the cookie exists
      if (cookies['m3o-auth-session']) {
        const { session } = await user.readSession({
          sessionId: cookies['m3o-auth-session']
        })

        const userReadResponse = await user.read({
          id: session!.userId
        })

        // Not sure this will ever be null
        account = userReadResponse.account || null
      }
    } catch (e) {
      // Handle this error somehow
      console.log(e)
    }

    return await fn({
      ...context,
      req: Object.assign({}, context.req, { user: account })
    })
  }
}
