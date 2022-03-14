import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getToken } from "../services/authHandler";
import doRequest from "../services/doRequest";

const UpdateContact = () => {
    const { id } = useParams();
    const [contactName,setContactName] = useState("")
    const [telephone,setTelephone] = useState("")
    const [note,setNote] = useState("")


    const [isPending,setIsPending] = useState(false)
    const [isFetching,setIsFetching] = useState(false)

    const [error,setError] = useState(null)
    const [errorFetching,setErrorFetching] = useState(null)

    const navigate = useNavigate();

    useEffect(async ()=>{
        setIsFetching(true)
        const resp = await doRequest(`http://127.0.0.1:8000/api/contact/${id}`,'GET',null,getToken())
        setIsFetching(false)
        if (resp.error_message) {
            setErrorFetching(true)
        }
        else{
        setContactName(resp.contactName)
        setTelephone(resp.telephone)
        setNote(resp.note)
        }
    },[])

    const update = async (e) => {
        e.preventDefault();
        const request_body = {contactName,telephone,note};
        setIsPending(true)
        const data = await doRequest(`http://127.0.0.1:8000/api/contacts/${id}`,
        'PUT',request_body,getToken());
        setIsPending(false)
        if(data.error_message){
            setError( data.error_message);
        }
        else{
            setError(null);
            navigate(-1)
        }
    }
    return (  
        <div className="contact-content">
            {isFetching && <p>Loading ....</p>}
            {errorFetching && <div className="alert alert-danger" role="alert">
                <span>There is no such contact back <Link to="/home">Home</Link></span>
            </div>}
            {!isFetching && !errorFetching && <form onSubmit={update} className="create-contact-form">
                <input className="form-control" type="text" required placeholder="Contact name"
                    value={contactName} onChange={(e)=>setContactName(e.target.value)}/>
                <input className="form-control" type="text" required placeholder="Telephone"
                    value={telephone} onChange={(e)=>setTelephone(e.target.value)}/>
                <input className="form-control" type="text" placeholder="Note."
                    value={note} onChange={(e)=>setNote(e.target.value)}/>
                {!isPending && <button className="btn btn-outline-primary">Update</button>}
                {isPending && <button disabled className="btn btn-outline-primary">Updating...</button>}
                {error && <p className="error-message">{error}</p>}
            </form>}
        </div>
    );
}
 
export default UpdateContact;