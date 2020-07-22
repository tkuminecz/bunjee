import React from 'react';
import { useAuth0User } from '~/auth0';
import LogoutButton from '~/components/LogoutButton';
import Page from '~/components/Page';

const Homepage: React.FC = () => {
  const { user } = useAuth0User();
  return (
    <Page>
      <div>welcome {user?.email}</div>
      <div>
        <LogoutButton />
      </div>
    </Page>
  );
};

export default Homepage;
