import 'isomorphic-unfetch'
import React, { useState, useEffect, useContext } from 'react'
import { initAuth0 } from '@auth0/nextjs-auth0'
import { SignInWithAuth0 } from '@auth0/nextjs-auth0/dist/instance'
import { getBaseUrl } from './helpers'
import { getCanonicalUrl } from './vercel'

const inBrowser = !(typeof window === 'undefined')

const SEVEN_DAYS = 60 * 60 * 24 * 7

export const getAuth0 = async (): Promise<SignInWithAuth0> => {
  const canonicalUrl = await getCanonicalUrl()
  const baseUrl = getBaseUrl(canonicalUrl)
  return initAuth0({
    issuerBaseURL: process.env.AUTH0_ISSUER,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    authorizationParams: { scope: 'openid profile email' },
    routes: {
      callback: `/api/auth/callback`,
      postLogoutRedirect: `${baseUrl}`,
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      rollingDuration: SEVEN_DAYS,
    },
    httpTimeout: 2500,
    clockTolerance: 10000,
  })
}

interface Auth0User {
  email: string
  picture: string
}

interface Auth0CtxData {
  user?: Auth0User
  loading: boolean
}

const Auth0Ctx = React.createContext<Auth0CtxData>(null)

const useProvideValue = (): Auth0CtxData => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(undefined)
  useEffect(() => {
    setLoading(true)
    getCanonicalUrl()
      .then((canonicalUrl) => {
        const baseUrl = inBrowser ? '' : getBaseUrl(canonicalUrl)
        return fetch(`${baseUrl}/api/auth/user`, {
          credentials: 'include',
        }).then(async (res) => {
          if (res.ok) {
            const body = await res.json()
            setUser(body)
          } else if (res.status !== 401) {
            throw new Error(
              `Error loading user: HTTP ${res.status} ${res.statusText}`
            )
          }
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return { user, loading }
}

export const Auth0Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Auth0Ctx.Provider value={useProvideValue()}>{children}</Auth0Ctx.Provider>
)

export const useAuth0User = (): Auth0CtxData => {
  return useContext(Auth0Ctx)
}
