import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AddContact from './components/addContact';
import AdminLogin from './components/adminLogin';
import AuthPage from './components/authenticationPage';
import ControlPanel from './components/controlPanel';
import Home from './components/home';
import Navbar from './nav';
import { AdminRoute, UpdateRoute, UserRoute } from './services/protectedRoutes';
import UpdateContact from './components/updateContact';
import UpdateUser from './components/updateUser';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Routes>
            <Route exact path='/' element={<AuthPage/>}/>
            <Route element={<UserRoute/>}>
              <Route path='/home' element={<Home/>}/>
              <Route path='/addContact' element={<AddContact/>}/>
            </Route>
            <Route path='/admin/login' element={<AdminLogin/>}/>
            <Route element={<AdminRoute/>}>
              <Route path='/admin' element={<ControlPanel/>}/>
              <Route path='/updateUser/:id' element={<UpdateUser/>}/>
            </Route>
            <Route element={<UpdateRoute/>}>
              <Route path='/updateContact/:id' element={<UpdateContact/>}/>
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
