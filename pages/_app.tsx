import React from 'react'
import { CssBaseline } from '@material-ui/core'
import App, { AppProps } from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import theme from '~/theme'
import { enhanceApp } from '~/lib/next-mui-jss'
import AuthGuard from '~/components/AuthGuard'
import { apolloClient } from '~/apollo'

const MyApp: React.FC<AppProps> = enhanceApp(theme)(
  ({ Component, pageProps }) => {
    return (
      <SessionProvider>
        <Head>
          <title>bunjee</title>
          <link rel="icon" type="image/svg+xml" href="/bunjee.svg" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
            rel="preload"
            as="style"
          />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <CssBaseline />
        <AuthGuard>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </AuthGuard>
      </SessionProvider>
    )
  }
)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
MyApp.getInitialProps = App.getInitialProps

export default MyApp
