import React, {useEffect} from 'react'
import { useStytch, useStytchSession } from '@stytch/react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


const Authenticate = () => {
  const client  = useStytch();
  const session = useStytchSession();
  const navigate = useNavigate();

  useEffect(() => {
    if(session){
      navigate('/dashboard')
    }else{
      const token = new URLSearchParams(window.location.search).get('token');
      client.magicLinks.authenticate(token, {session_duration_minutes:60})
      .then(()=> {
        toast.success('Authenticated');
        navigate(0);
      })
    }
  },[client, session]);

  return (
    <div>
        <h1>....Loading</h1>
        <p>Please wait while we authenticate</p>

    </div>
  )
}

export default Authenticate