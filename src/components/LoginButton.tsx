import React from 'react'
import { signIn } from 'next-auth/react'

const LoginButton: React.FC = () => {
  return (
    <button onClick={() => signIn()}>
      <a>Login</a>
    </button>
  )
}

export default LoginButton
