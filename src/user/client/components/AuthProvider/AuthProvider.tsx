import type { Account } from 'm3o/user'
import type { PropsWithChildren, ReactElement } from 'react'
import React, {
  useCallback,
  createContext,
  useEffect,
  useContext,
  useState
} from 'react'
import cookies from 'js-cookie'
import { CONFIG } from '../../../../config'

type AuthProviderProps = PropsWithChildren<{ user?: Account }>

type AuthContext = {
  isAuthenticating: boolean
  error?: string
  user?: Account
  setUser: (user?: Account) => void
}

interface AuthProviderState {
  isAuthenticating: boolean
  error?: string
  user?: Account
}

interface AuthAuthenticateResponse {
  account: Account
}

const missingProviderError = 'Please use within the <AuthProvider>'

const AuthContext = createContext<AuthContext>({
  get user(): never {
    throw new Error(missingProviderError)
  },
  get error(): never {
    throw new Error(missingProviderError)
  },
  get isAuthenticating(): never {
    throw new Error(missingProviderError)
  },
  setUser: (): never => {
    throw new Error(missingProviderError)
  }
})

async function fetchUser(): Promise<AuthAuthenticateResponse | undefined> {
  const response = await fetch(`/api/${CONFIG.API_FOLDER_NAME}/me`)
  return response.ok ? response.json() : undefined
}

export function AuthProvider({
  children,
  user: initialUser
}: AuthProviderProps): ReactElement {
  const [state, setState] = useState<AuthProviderState>({
    isAuthenticating: !initialUser,
    user: initialUser
  })

  const setUser = useCallback((user?: Account) => {
    setState(prev => ({ ...prev, user, isAuthenticating: false }))
  }, [])

  useEffect(() => {
    const sessionCookie = cookies.get(CONFIG.USER_COOKIE_NAME)

    ;(async (): Promise<void> => {
      if (!sessionCookie) {
        setState(prev => ({ ...prev, isAuthenticating: false }))
        return
      }

      const response = await fetchUser()

      if (response) {
        setUser(response.account)
      }
    })()
  }, [])

  console.log(state)

  return (
    <AuthContext.Provider value={{ ...state, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}
