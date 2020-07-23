import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Link from 'next/link';
import Logo from './Logo';

const useStyles = makeStyles(theme => ({
  wrapper: {
    borderBottom: '1px solid #bbb',
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  nav: {
    marginLeft: theme.spacing(2),
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Container>
        <header className={classes.header}>
          <Logo />{' '}
          <nav className={classes.nav}>
            <Link href="/" passHref>
              <a>Home</a>
            </Link>
          </nav>
        </header>
      </Container>
    </div>
  );
};

export default Header;
