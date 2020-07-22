import React from 'react';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  page: {
    margin: theme.spacing(2, 1),
  },
  content: {},
}));

interface Props {
  children: React.ReactNode;
}

const Page: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <main className={classes.content}>
        <Container>{children}</Container>
      </main>
    </div>
  );
};

export default Page;
