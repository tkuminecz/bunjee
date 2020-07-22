import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/react-hooks';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Page from '~/components/Page';

const GET_APP = gql`
  query App($appId: String!) {
    app(id: $appId) {
      id
      name
    }
  }
`;

const DELETE_APP = gql`
  mutation DeleteApp($appId: String!) {
    deleteApp(id: $appId) {
      id
      name
    }
  }
`;

interface Props {
  appId: string;
}

export const AppDetails: NextPage<Props> = ({ appId }) => {
  const router = useRouter();
  const { data } = useQuery(GET_APP, { variables: { appId } });
  const [deleteApp] = useMutation(DELETE_APP, { variables: { appId } });
  const onDelete = async () => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      `Are you sure you want to delete ${data?.app.name}?`
    );
    if (confirmed) {
      // delete the app
      const deleteData = await deleteApp();
      if (deleteData) {
        void router.push('/');
      }
    }
  };
  return (
    <Page>
      <h3>{data?.app?.name}</h3>
      <button onClick={onDelete} type="button">
        Delete App
      </button>
    </Page>
  );
};

AppDetails.getInitialProps = async ({ query }) => {
  const { appId } = query;
  if (Array.isArray(appId)) throw new Error('expected single appId');

  return { appId };
};

export default AppDetails;
