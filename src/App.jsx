import './App.css'
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { SignIn } from './Pages/SignIn'
import Dashboard from './Pages/Dashboard'
import { useContext } from 'react'
import { ProtectRouteUser } from './Protect/ProtectRoutesUser'
import { AuthContext } from './context/AuthContext'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { CartProvider } from 'react-use-cart'
import SignUp from './Pages/SignUp'
import HeaderMain from './companents/HeaderMain'
import { IoMdMenu } from "react-icons/io";

function App() {

  let user = JSON.parse(localStorage.getItem('user'))

  const LogOut = () => {
    localStorage.removeItem('user');
    <Navigate to={'/'}/>
    window.location.reload();
  }

  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/signin' />
  }

  return (
    <BrowserRouter>
      <nav className=''>
        <h1>Car sell</h1>
        <input type="checkbox" id='check' />
        <label htmlFor="check" className='checkboxbtn'>
        <IoMdMenu />
        </label>

        <div className="navigation">
          <ul className='menu2'>
          <li className='li'><NavLink to="/">Home</NavLink></li>
          {user && <li className='li'><NavLink to="/dashboard">Dashboard</NavLink></li>}

            {user && <li onClick={LogOut}><NavLink>Log out</NavLink></li>}
          {!user && <li className='li'><NavLink to="/signin"><a href="" className='menu'>Sign in</a></NavLink></li>}
          {!user &&  <li className='sign_up'><NavLink to="/signup">Sign up</NavLink></li>}
          </ul>
        
        
          
       </div>
        
      </nav>
      

      <CartProvider>
      <Routes>
        <Route element={<HeaderMain />} path='/' />
        <Route element={<SignUp />} path='/signup' />
        <Route element={<SignIn />} path='/signin' />
        <Route element={<ProtectRouteUser><RequireAuth><Dashboard /></RequireAuth></ProtectRouteUser>} path='/dashboard' />
      </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
