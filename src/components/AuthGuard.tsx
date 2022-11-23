import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'
import LoginButton from './LoginButton'
import Logo from './Logo'
import { useSession } from 'next-auth/react'

const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(170deg, #eee 0%, #fff 100%)',
  },
  logo: {
    fontSize: '3rem',
  },
}))

interface Props {
  children: React.ReactNode
}

const AuthGuard: React.FC<Props> = ({ children }) => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const classes = useStyles()
  return (
    <>
      {loading || !session ? (
        <>
          <div className={classes.wrapper}>
            <Logo className={classes.logo} />
            {loading ? <CircularProgress /> : <LoginButton />}
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default AuthGuard
