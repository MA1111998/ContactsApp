import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../services/authHandler";
import doRequest from "../services/doRequest";

const UpdateUser = () => {
    const { id } = useParams();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");


    const [isPending,setIsPending] = useState(false)
    const [isFetching,setIsFetching] = useState(false)

    const [error,setError] = useState(null)
    const navigate = useNavigate();

    useEffect(async ()=>{
        setIsFetching(true)
        const resp = await doRequest(`http://127.0.0.1:8000/api/users/${id}`,'GET',null,getToken())
        setIsFetching(false)
        setFirstname(resp.firstname);
        setLastname(resp.lastname);
        setEmail(resp.email);
        setTelephone(resp.telephone);
    },[])

    const update = async (e) => {
        e.preventDefault();
        const request_body = {firstname,lastname,email,telephone};
        setIsPending(true)
        const data = await doRequest(`http://127.0.0.1:8000/api/users/${id}`,
        'PUT',request_body,getToken());
        setIsPending(false)
        if(data.error_message){
            setError( data.error_message);
        }
        else{
            setError(null);
            navigate('/admin')
        }
    }
    return (  
        <div className="user-content">
            {isFetching && <p>Loading ....</p>}
            {!isFetching && <form onSubmit={update} className="update-user-form">
                <input className="form-control" type="text" required placeholder="firstname"
                    value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
                <input className="form-control" type="text" required placeholder="lastname"
                    value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
                <input className="form-control" type="text" required placeholder="Telephone"
                    value={telephone} onChange={(e)=>setTelephone(e.target.value)}/>
                {!isPending && <button className="btn btn-outline-primary">Update</button>}
                {isPending && <button disabled className="btn btn-outline-primary">Updating...</button>}
                {error && <p>{error}</p>}
            </form>}
        </div>
    );
}
 
export default UpdateUser;