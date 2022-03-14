import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, getUserID } from "../services/authHandler";
import doRequest from "../services/doRequest";

const AddContact = () => {
    const [contactName,setContactName] = useState("")
    const [telephone,setTelephone] = useState("")
    const [note,setNote] = useState("")


    const [isPending,setIsPending] = useState(false)
    const [error,setError] = useState(null)
    const navigate = useNavigate();

    const create = async (e) => {
        e.preventDefault();
        const request_body = {contactName,telephone,note};
        setIsPending(true)
        setError(null);
        const data = await doRequest("http://127.0.0.1:8000/api/contacts",'POST',request_body,getToken());
        setIsPending(false)
        if(data.error_message){
            setError( data.error_message);
        }
        else{
            navigate('/home')
        }
    }
    return (  
        <div  className="contact-content">
            <form onSubmit={create} className="create-contact-form">
                <input className="form-control" type="text" required placeholder="Contact name"
                    value={contactName} onChange={(e)=>setContactName(e.target.value)}/>
                <input className="form-control" type="text" required placeholder="Telephone"
                    value={telephone} onChange={(e)=>setTelephone(e.target.value)}/>
                <input className="form-control" type="text" placeholder="Note."
                    value={note} onChange={(e)=>setNote(e.target.value)}/>
                {!isPending && <button className="btn btn-outline-primary">Add</button>}
                {isPending && <button disabled className="btn btn-outline-primary">Adding...</button>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}
 
export default AddContact;