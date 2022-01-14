import React from 'react'
import Link from 'next/link'

const LogoutButton: React.FC = () => {
  return (
    <Link href="/api/auth/logout" passHref>
      <a>Logout</a>
    </Link>
  )
}

export default LogoutButton
