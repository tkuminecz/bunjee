import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core';
import Logo from './Logo';

const useStyles = makeStyles(theme => ({
  header: {
    borderBottom: '1px solid #555',
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
    <header className={classes.header}>
      <Logo />{' '}
      <nav className={classes.nav}>
        <Link href="/" passHref>
          <a>Home</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
