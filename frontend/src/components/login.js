import { useState } from 'react';
import doRequest from '../services/doRequest';
import { setToken, setUserID } from '../services/authHandler';
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isPending,setIsPending] = useState(false)
    const [error,setError] = useState(null)
    const navigate = useNavigate();
    const login = async (e) => {
        e.preventDefault();
        const request_body = {email,password};
        setIsPending(true)
        setError(null);
        const data = await doRequest("http://127.0.0.1:8000/api/login",'POST',request_body,null);
        setIsPending(false)
        console.log(data);
        if(data.error_message){
            setError( data.error_message);
        }
        else{
            // console.log(data);
            setToken(data.token)
            setUserID(data.user.id)
            navigate('/home')
        }
    };
    return ( 
        <div className="login-content">
            <form onSubmit={login} className="login-form">
                <input className="form-control" type="email" required placeholder="Enter your email here"
                value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input className="form-control" type="password" required placeholder="Enter your password here"
                value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {!isPending && <button className="btn btn-outline-primary">Login</button>}
                {isPending && <button disabled className="btn btn-outline-primary">Login...</button>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}
    
export default Login;
