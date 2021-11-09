import type { AuthState, AuthActions } from './types'

export function authReducer(state: AuthState, action: AuthActions): AuthState {
  switch (action.type) {
    // Authenticate
    case 'authenticate':
      return { ...state, isAuthenticating: true }

    case 'authenticate success':
      return { ...state, isAuthenticating: false, user: action.payload }

    // Login
    case 'login start':
      return { ...state, isLoggingIn: true, loginError: '' }

    case 'login success':
      return { ...state, isLoggingIn: false, user: action.payload }

    case 'login error':
      return { ...state, isLoggingIn: false, loginError: action.payload }

    // Logout
    case 'logout start':
      return { ...state, isLoggingOut: true, logoutError: '' }

    case 'logout success':
      return { ...state, isLoggingOut: false, user: null }

    case 'logout error':
      return { ...state, logoutError: action.payload, isLoggingOut: false }

    default:
      throw new Error(`Unhandled action`)
  }
}
