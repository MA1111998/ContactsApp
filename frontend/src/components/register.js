import { useState } from 'react';
import doRequest from '../services/doRequest';
import { setToken, setUserID } from '../services/authHandler';
import {useNavigate} from 'react-router-dom'


const  Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [password, setpassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    
    const [isPending,setIsPending] = useState(false)
    const [error,setError] = useState(null)
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        const request_body = {firstname,lastname,email,telephone,password,password_confirmation,"isAdmin":false};
        setIsPending(true)
        setError(null);
        const data = await doRequest("http://127.0.0.1:8000/api/register",'POST',request_body,null);
        setIsPending(false)
        if(data.error_message){
            setError( data.error_message);
        }
        else{
            // console.log(data);
            setToken(data.token)
            setUserID(data.user.id)
            navigate('/home')
        }
    }
    return (
        <div className="register-content">
            <form onSubmit={register} className="register-form">
                <input className="form-control" type="text" required placeholder="Enter your firstname here"
                    value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
                <input className="form-control" type="text" required placeholder="Enter your lastname here"
                    value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
                <input className="form-control" type="email" required placeholder="Enter your email here"
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input className="form-control" type="text" required placeholder="Enter your telephone here"
                    value={telephone} onChange={(e)=>setTelephone(e.target.value)}/>
                <input className="form-control" type="password" required placeholder="Enter your password here"
                    value={password} onChange={(e)=>setpassword(e.target.value)}/>
                <input className="form-control" type="password" required placeholder="Enter your password again"
                    value={password_confirmation} onChange={(e)=>setPassword_confirmation(e.target.value)}/>
                {!isPending && <button className="btn btn-outline-primary">Register</button>}
                {isPending && <button disabled className="btn btn-outline-primary">Registering...</button>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}
 
export default Register;