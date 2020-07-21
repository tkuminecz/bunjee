import { initAuth0 } from '@auth0/nextjs-auth0';
import { ISignInWithAuth0 } from '@auth0/nextjs-auth0/dist/instance';

const EIGHT_HOURS = 60 * 60 * 8;

export const getAuth0 = (): ISignInWithAuth0 => {
  return initAuth0({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: 'openid profile email',
    redirectUri: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/sign-in-callback`
      : process.env.AUTH0_REDIRECT_URI,
    postLogoutRedirectUri: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/sign-out`
      : process.env.AUTH0_LOGOUT_REDIRECT_URI,
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
