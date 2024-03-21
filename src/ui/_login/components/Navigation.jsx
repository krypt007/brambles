import React from 'react'
import { NavLink } from 'react-router-dom'
import { useStytchSession } from '@stytch/react'

import Dashboard from '../../../Pages/Dashboard'
import Login from '../../../Pages/Login'

const Navigation = () => {
    const session = useStytchSession()
  return (
    <Nav>
        {session && <NavLink to={Dashboard}>Dashboard</NavLink>}
        {!session && <NavLink to={Login}>Login</NavLink>}
    </Nav>
  )
}

export default Navigation