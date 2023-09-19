import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

//Este componente redirige al usuario a login en caso de no tener una sesion abierta

export function PrivateRoute ({children}){
    
    const auth = useAuth();

    return auth.user? children : <Navigate to="/login"/>
}