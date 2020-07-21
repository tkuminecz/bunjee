import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useAuth0User } from '~/auth0';
import LoginButton from './LoginButton';

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
    color: '#333',
    fontFamily: 'Lato',
    fontSize: '3rem',
    fontWeight: 300,
  },
  icon: {
    marginRight: '0.5rem',
  },
}));

interface Props {
  children: React.ReactNode;
}

const AuthGuard: React.FC<Props> = ({ children }) => {
  const { user, loading } = useAuth0User();
  const classes = useStyles();
  return (
    <>
      {loading ? (
        <>
          <div className={classes.wrapper}>
            <span className={classes.logo}>
              <i className={`fal fa-portal-exit ${classes.icon}`} />
              bunjee
            </span>
          </div>
        </>
      ) : (
        <>
          {user ? (
            <>{children}</>
          ) : (
            <>
              <div className={classes.wrapper}>
                <span className={classes.logo}>
                  <i className={`fal fa-portal-exit ${classes.icon}`} />
                  bunjee
                </span>
                <LoginButton />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AuthGuard;
