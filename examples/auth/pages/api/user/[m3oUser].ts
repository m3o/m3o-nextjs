import { handleAuth } from '@/m3o/handleAuth'

export default handleAuth({
  authCookieName: 'session',
  registerEmailOptions: {
    fromName: 'Test nextjs',
    redirectUrl: 'http://localhost:3000',
    subject: 'Testing from Nextjs',
    textContent:
      'Please verify your email by clicking this link: $micro_verification_link',
  },
})
