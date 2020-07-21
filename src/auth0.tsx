import 'isomorphic-unfetch';
import React, { useState, useEffect, useContext } from 'react';
import { initAuth0 } from '@auth0/nextjs-auth0';
import { ISignInWithAuth0 } from '@auth0/nextjs-auth0/dist/instance';
import { getBaseUrl } from './helpers';

const inBrowser = !(typeof window === 'undefined');

const EIGHT_HOURS = 60 * 60 * 8;

export const getAuth0 = (): ISignInWithAuth0 => {
  return initAuth0({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: 'openid profile email',
    redirectUri: `${getBaseUrl()}/api/auth/callback`,
    postLogoutRedirectUri: `${getBaseUrl()}`,
    session: {
      cookieSecret: process.env.AUTH0_COOKIE_SECRET,
      cookieLifetime: EIGHT_HOURS,
      storeIdToken: true,
      storeAccessToken: true,
      storeRefreshToken: true,
    },
    oidcClient: {
      httpTimeout: 2500,
      clockTolerance: 10000,
    },
  });
};

interface Auth0User {
  email: string;
  picture: string;
}

interface Auth0CtxData {
  user?: Auth0User;
  loading: boolean;
}

const Auth0Ctx = React.createContext<Auth0CtxData>(null);

const useProvideValue = (): Auth0CtxData => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    setLoading(true);
    const baseUrl = inBrowser ? '' : getBaseUrl();
    fetch(`${baseUrl}/api/auth/user`, { credentials: 'include' })
      .then(async res => {
        if (res.ok) {
          const body = await res.json();
          setUser(body);
        } else if (res.status !== 401) {
          throw new Error(
            `Error loading user: HTTP ${res.status} ${res.statusText}`
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { user, loading };
};

export const Auth0Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Auth0Ctx.Provider value={useProvideValue()}>{children}</Auth0Ctx.Provider>
);

export const useAuth0User = (): Auth0CtxData => {
  return useContext(Auth0Ctx);
};
