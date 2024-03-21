import React from 'react'
import { FirebaseLoginForm } from '../../ui/_login'

const Login = ({handleLogin}) => {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
        <FirebaseLoginForm />
    </div>
  )
}

export default Login