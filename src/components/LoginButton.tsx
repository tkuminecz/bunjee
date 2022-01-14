import React from 'react'
import Link from 'next/link'

const LoginButton: React.FC = () => {
  return (
    <Link href="/api/auth/login" passHref>
      <a>Login</a>
    </Link>
  )
}

export default LoginButton
