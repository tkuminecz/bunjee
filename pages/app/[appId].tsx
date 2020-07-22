import React from 'react';
import { NextPage } from 'next';
import { gql, useQuery } from '@apollo/react-hooks';
import Page from '~/components/Page';

const APP = gql`
  query App($appId: String!) {
    app(id: $appId) {
      id
      name
    }
  }
`;

interface Props {
  appId: string;
}

export const AppDetails: NextPage<Props> = ({ appId }) => {
  const { data } = useQuery(APP, { variables: { appId } });
  return (
    <Page>
      <p>{data?.app?.name}</p>
    </Page>
  );
};

AppDetails.getInitialProps = async ({ query }) => {
  const { appId } = query;
  if (Array.isArray(appId)) throw new Error('expected single appId');

  return { appId };
};

export default AppDetails;
