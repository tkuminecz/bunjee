import React from 'react';
import { useQuery, gql } from '@apollo/react-hooks';
import { LinearProgress, makeStyles } from '@material-ui/core';
import Link from 'next/link';

const APPS = gql`
  query Apps {
    apps {
      id
      name
    }
  }
`;

const useStyles = makeStyles(() => ({
  id: {
    fontSize: '0.75rem',
    opacity: 0.6,
  },
}));

const AppList: React.FC = () => {
  const { data, loading, error } = useQuery(APPS, { fetchPolicy: 'no-cache' });
  const apps = (data && data.apps) || [];
  const classes = useStyles();

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <h3>Apps</h3>
      <p>
        <Link href="/app/create" passHref>
          <a>Add new app</a>
        </Link>
      </p>
      {loading ? (
        <LinearProgress />
      ) : (
        <ul>
          {apps.map(app => (
            <li key={app.id}>
              <Link href="/app/[appId]" as={`/app/${app.id}`} passHref>
                <a>
                  {app.name} <span className={classes.id}>({app.id})</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AppList;
