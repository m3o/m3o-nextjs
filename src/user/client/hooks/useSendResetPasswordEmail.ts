import { useCallback } from 'react'
import { useApiState, UseApiState } from '../../../ui/hooks/use-api-state'
import { post } from '../../../ui/fetch'

interface SendResetPasswordEmailProps {
  email: string
}

interface UseSendResetPasswordEmail
  extends Omit<UseApiState, 'setError' | 'setStatus'> {
  sendResetPasswordEmail: (props: SendResetPasswordEmailProps) => void
}

interface UseSendResetPasswordProps {
  onSuccess: (email: string) => void
}

export function useSendResetPasswordEmail({
  onSuccess
}: UseSendResetPasswordProps): UseSendResetPasswordEmail {
  const { setError, setStatus, ...apiState } = useApiState()

  const sendResetPasswordEmail = useCallback(
    async ({ email }: SendResetPasswordEmailProps) => {
      setStatus('loading')

      try {
        await post('/api/user/send-password-reset-email', {
          email
        })

        onSuccess(email)
        setStatus('idle')
      } catch (e) {
        setStatus('error')
        setError('Error')

        console.log(e)
      }
    },
    []
  )

  return {
    ...apiState,
    sendResetPasswordEmail
  }
}
