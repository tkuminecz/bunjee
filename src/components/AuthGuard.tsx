import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'
import { useAuth0User } from '~/auth0'
import LoginButton from './LoginButton'
import Logo from './Logo'

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
  const { user, loading } = useAuth0User()
  const classes = useStyles()
  return (
    <>
      {loading || !user ? (
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
