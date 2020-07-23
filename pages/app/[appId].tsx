import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Page from '~/components/Page';
import { GET_APP, LIST_APPS } from '~/graphql/queries';
import {
  DELETE_APP,
  CREATE_REDIRECT_URI,
  DELETE_REDIRECT_URI,
  REFRESH_APP_SECRET,
} from '~/graphql/mutations';

interface Props {
  appId: string;
}

export const AppDetails: NextPage<Props> = ({ appId }) => {
  const router = useRouter();

  const { data } = useQuery(GET_APP, { variables: { appId } });

  const [deleteApp] = useMutation(DELETE_APP, {
    variables: { appId },
    refetchQueries: [{ query: LIST_APPS }],
  });
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

  const { handleSubmit, register, errors, reset } = useForm();
  const [createRedirectUri] = useMutation(CREATE_REDIRECT_URI, {
    refetchQueries: [{ query: GET_APP, variables: { appId } }],
  });
  const onSubmit = async ({ redirectUri: uri }) => {
    await createRedirectUri({ variables: { data: { uri, appId } } });
    reset();
  };

  const [deleteRedirectUri] = useMutation(DELETE_REDIRECT_URI, {
    refetchQueries: [{ query: GET_APP, variables: { appId } }],
  });
  const onDeleteRedirectUri = redirectUriId => async () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Delete this uri?`)) {
      await deleteRedirectUri({ variables: { redirectUriId } });
    }
  };

  const [refreshAppSecret, { loading: refreshingSecret }] = useMutation(
    REFRESH_APP_SECRET
  );
  const onRefreshAppSecret = async () => {
    await refreshAppSecret({ variables: { appId } });
  };

  return (
    <Page>
      <h3>{data?.app.name}</h3>
      <div>
        <h4>Redirect URIs</h4>
        <ul>
          {(data?.app.redirectUris || []).map(entry => (
            <li key={entry.id}>
              <pre>
                {entry.uri}
                <button onClick={onDeleteRedirectUri(entry.id)} type="button">
                  x
                </button>
              </pre>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="redirectUri"
            ref={register({ required: 'Required' })}
          />
          <button type="submit" disabled={errors.redirectUri?.message}>
            Add Redirect URI
          </button>
        </form>
      </div>
      <button
        onClick={onRefreshAppSecret}
        type="button"
        disabled={refreshingSecret}
      >
        Refresh App Secret
      </button>
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
