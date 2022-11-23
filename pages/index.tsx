import React from 'react'
import { useSession } from 'next-auth/react'
import LogoutButton from '~/components/LogoutButton'
import Page from '~/components/Page'
import AppList from '~/components/AppList'

const Homepage: React.FC = () => {
  const { data: session } = useSession()
  return (
    <Page>
      <div>welcome {session.user?.email}</div>
      <div>
        <LogoutButton />
      </div>
      <div>
        <AppList />
      </div>
    </Page>
  )
}

export default Homepage
