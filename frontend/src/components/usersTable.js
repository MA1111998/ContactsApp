import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/authHandler";
import doRequest from "../services/doRequest";

const UsersTable = () => {
    const [isPending,setIsPending] = useState(false)
    const [isDeleting,setIsDeleting] = useState(false)

    // const [error,setError] = useState(null)
    const [data,setData] = useState();
    const navigate =useNavigate()

    useEffect(async ()=>{
        setIsPending(true)
        let x = await doRequest(`http://127.0.0.1:8000/api/users`,'GET',null,getToken())
        setData(x);
        setIsPending(false);
    },[])

    const handleUpdate = (id) => {
        navigate(`/updateUser/${id}`);
    }

    const handleDelete = async (id) => {
        setIsDeleting(true)
        const response = await doRequest(`http://127.0.0.1:8000/api/users/${id}`,
        'DELETE',null,getToken());
        setIsDeleting(false)
        if(response.error_message){
            alert( data.error_message);
        }
        else{
            const temp = data.filter((item)=>item.id !== id)
            setData(temp)
        }
    }
    return ( 
        <div className="users-table-content">
            <h2>Users List</h2>
            {isPending && <div>Loading Please Wait...</div>}

            {data && <div class="table-responsive">
            <table className="table table-dark table-bordered table-hover table-bordered table-sm">
                <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>
                {data.map((row) => 
                    <tbody key={row.id}>
                        <tr>
                            <td >{row.firstname}</td>
                            <td>{row.lastname}</td>
                            <td>{row.email}</td>
                            <td>{row.telephone}</td>
                            <td><button onClick={() => {handleUpdate(row.id)}} type="button" className="btn btn-outline-warning">Update</button></td>
                            <td>
                                {!isDeleting && <button onClick={() => {handleDelete(row.id)}} type="button" className="btn btn-outline-danger">Delete</button>}
                                {isDeleting && <button disabled type="button" className="btn btn-outline-danger">Deleting</button>}
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
            </div>}
        </div>
    );
}
 
export default UsersTable;