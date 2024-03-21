import { Navigate } from "react-router-dom";
import { useStytchSession } from "@stytch/react";

const ProtectedRoutes = ({children}) => {
    const session = useStytchSession()

    if(!session)   return (<Navigate to={"/login"} replace />)
    
    return children
}

export default ProtectedRoutes