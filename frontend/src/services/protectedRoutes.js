import { getAdminID, getUserID } from "./authHandler";
import {Outlet,Navigate} from 'react-router-dom'
import doRequest from "./doRequest";

export const UserRoute = () => {
    return getUserID() ? <Outlet/>:  <Navigate to="/"/>
}

export const AdminRoute = () => {
    return getAdminID() ? <Outlet/>:  <Navigate to="/admin/login"/>
}

export const UpdateRoute = () => {
    if(getAdminID() || getUserID())
        return <Outlet/>
    return <Navigate to="/"/>
}
