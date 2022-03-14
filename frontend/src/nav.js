import {Link} from 'react-router-dom'
import { deleteTokens, getAdminID, getToken, getUserID } from './services/authHandler';
import { useNavigate } from 'react-router-dom';
import doRequest from './services/doRequest';

const Navbar = () => {

    const navigate = useNavigate()
    const logout = async (e) => {
        e.preventDefault();
        const data = await doRequest("http://127.0.0.1:8000/api/logout",'POST',null,getToken());
        if (data.isLoggedOut) {
            deleteTokens();
            navigate('/')
        }
    }

    const logout_admin = async (e) => {
        e.preventDefault();
        const data = await doRequest("http://127.0.0.1:8000/api/admin/logout",'POST',null,getToken());
        if (data.isLoggedOut) {
            deleteTokens();
            navigate('/admin/login')
        }
    }
    return (
        <div>
            {getUserID() && getToken() && <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/home" className="navbar-brand">ContactsApp</Link>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/addContact">Add Contact</Link>
                        </li>
                    </ul>
                    <form onSubmit={logout} className="form-inline">
                        <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Logout</button>
                    </form>
                </div>
            </nav>}
            {getAdminID() && getToken() && <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/admin" className="navbar-brand">Control Panel</Link>
                    <form onSubmit={logout_admin} className="form-inline">
                        <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Logout</button>
                    </form>
                </div>
            </nav>}
        </div>
    );
}
 
export default Navbar;