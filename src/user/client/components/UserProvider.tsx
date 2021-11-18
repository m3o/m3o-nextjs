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
import { CONFIG } from '../../../config'

type UserProviderProps = PropsWithChildren<{ user?: Account }>

type UserContext = {
  isAuthenticating: boolean
  error?: string
  user?: Account
  setUser: (user?: Account) => void
}

interface UserProviderState {
  isAuthenticating: boolean
  error?: string
  user?: Account
}

interface UserAuthenticateResponse {
  account: Account
}

const missingProviderError = 'Please use within the <AuthProvider>'

const AuthContext = createContext<UserContext>({
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

async function fetchUser(): Promise<UserAuthenticateResponse | undefined> {
  const response = await fetch(`/api/${CONFIG.API_FOLDER_NAME}/me`)
  return response.ok ? response.json() : undefined
}

export default function UserProvider({
  children,
  user: initialUser
}: UserProviderProps): ReactElement {
  const [state, setState] = useState<UserProviderState>({
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

  return (
    <AuthContext.Provider value={{ ...state, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useUser() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a <UserProvider>')
  }

  return context
}
