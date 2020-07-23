import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import Page from '~/components/Page';
import { CREATE_APP } from '~/graphql/mutations';

const useStyles = makeStyles(theme => ({
  error: {
    color: theme.palette.error.main,
    fontSize: '0.75rem',
    fontWeight: 600,
    margin: theme.spacing(0.5, 0),
  },
}));

const CreateAppPage: React.FC = () => {
  const router = useRouter();
  const classes = useStyles();
  const [createApp, { loading: saving, data, error }] = useMutation(CREATE_APP);
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = async values => {
    await createApp({
      variables: {
        data: {
          name: values.name,
        },
      },
    });
  };

  const created = data && !saving && !error;
  useEffect(() => {
    if (created) {
      setTimeout(() => {
        void router.replace('/app/[appId]', `/app/${data?.createApp.id}`);
      }, 500);
    }
  }, [created, data, router]);

  return (
    <Page>
      <h3>Add an app</h3>
      {!created ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="app.name">
              Name:
              <input
                type="text"
                id="app.name"
                name="name"
                ref={register({ required: 'Required' })}
              />
            </label>
            {errors?.name?.message && (
              <p className={classes.error}>{errors.name.message}</p>
            )}
          </div>
          <div>
            <button type="submit" disabled={saving}>
              Create
            </button>
          </div>
        </form>
      ) : (
        <p>Created! Redirecting to app page...</p>
      )}
    </Page>
  );
};

export default CreateAppPage;
