import type { Dispatch } from 'react'
import type { Account, LoginRequest, UpdatePasswordRequest } from 'm3o/user'

export interface AuthState {
  authenticateError: string
  isAuthenticating: boolean
  isLoggingIn: boolean
  isLoggingOut: boolean
  isChangingPassword: boolean
  changePasswordError: string
  loginError: string
  logoutError: string
  user: Account | null
}

interface AuthenticateUserAction {
  type: 'authenticate'
}

interface AuthenticateSuccessAction {
  type: 'authenticate success'
  payload: AuthState['user']
}

interface LoginAction {
  type: 'login start'
}

interface LoginSuccessAction {
  type: 'login success'
  payload: Account
}

interface LoginErrorAction {
  type: 'login error'
  payload: string
}

interface LogoutAction {
  type: 'logout start'
}

interface LogoutSuccessAction {
  type: 'logout success'
}

interface LogoutErrorAction {
  type: 'logout error'
  payload: string
}

interface ChangePasswordAction {
  type: 'change password'
}

interface ChangePasswordSuccessAction {
  type: 'change password success'
}

interface ChangePasswordErrorAction {
  type: 'change password error'
  payload: string
}

export type AuthActions =
  | AuthenticateUserAction
  | AuthenticateSuccessAction
  | ChangePasswordAction
  | ChangePasswordSuccessAction
  | ChangePasswordErrorAction
  | LoginAction
  | LoginErrorAction
  | LoginSuccessAction
  | LogoutAction
  | LogoutSuccessAction
  | LogoutErrorAction

export type AuthDispatch = Dispatch<AuthActions>

export interface AuthContextProvider extends AuthState {
  changePassword: (payload: Omit<UpdatePasswordRequest, 'userId'>) => void
  login: (payload: LoginRequest) => void
  logout: VoidFunction
}
