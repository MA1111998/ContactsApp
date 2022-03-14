import Login from "./login";
import Register from "./register";
import { useEffect } from "react";
import { getToken } from "../services/authHandler";
import { useNavigate } from "react-router-dom";
const AuthPage = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        if(getToken())
            navigate('/home')
    })
    return ( 
        <div className="relative-layout">
            <div className="auth-content">
                <Login/>
                <Register/>
            </div>
        </div>
    );
}
 
export default AuthPage;