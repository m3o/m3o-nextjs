import type { PropsWithChildren, ReactElement } from 'react'
import type { LoginRequest, UpdatePasswordRequest, Account } from 'm3o/user'
import type { AuthContextProvider, AuthState } from './types'
import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useMemo
} from 'react'
import Cookies from 'js-cookie'
import { loginUser } from './api/login-user'
import { logoutUser } from './api/logout-user'
import { changePassword } from './api/change-password'
import { authenticateUser } from './api/authenticate-user'
import { authReducer } from './reducer'

type AuthProviderProps = PropsWithChildren<{ user: Account | null }>

const AuthContext = createContext({} as AuthContextProvider)

export function AuthProvider({
  children,
  user = null
}: AuthProviderProps): ReactElement {
  const [state, dispatch] = useReducer(authReducer, {
    authenticateError: '',
    changePasswordError: '',
    isChangingPassword: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isAuthenticating: false,
    loginError: '',
    logoutError: '',
    user: user
  } as AuthState)

  useEffect(() => {
    const authSessionCookie = Cookies.get('m3o-auth-session')

    if (authSessionCookie) {
      authenticateUser(dispatch)
    }
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      changePassword: (payload: Omit<UpdatePasswordRequest, 'userId'>) =>
        changePassword(payload, dispatch),
      login: (payload: LoginRequest) => loginUser(payload, dispatch),
      logout: () => logoutUser(dispatch)
    }),
    [state]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}
