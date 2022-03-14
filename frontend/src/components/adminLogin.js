import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAdminID, setToken } from "../services/authHandler";
import doRequest from "../services/doRequest";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPending,setIsPending] = useState(false)
    const [error,setError] = useState(null)
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const request_body = {username,password};
        setIsPending(true)
        setError(null);
        const data = await doRequest("http://127.0.0.1:8000/api/admin/login",'POST',request_body,null);
        setIsPending(false)
        if(data.error_message){
            setError( data.error_message);
        }
        else{
            setError(null);
            // console.log(data);
            setToken(data.token)
            setAdminID(data.admin.id)
            navigate('/admin')
        }
    };
    return ( 
        <div className="admin-login-content">
            <form onSubmit={login} className="login-form">
                <input className="form-control" type="text" required placeholder="Username"
                value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input className="form-control" type="password" required placeholder="Password"
                value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {!isPending && <button className="btn btn-outline-primary">Login</button>}
                {isPending && <button disabled className="btn btn-outline-primary">Login...</button>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}
 
export default AdminLogin;