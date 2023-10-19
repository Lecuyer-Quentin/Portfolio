import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../../app/api/authSlice'
import { selectAccessToken } from '../../app/api/authSlice'
import { useDispatch } from 'react-redux'
import { logout } from '../../app/api/authSlice'
import { toast } from 'react-toastify'
import { useState } from 'react'



const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const accessToken = useSelector(selectAccessToken)
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  const handleLogout = () => {
    try {
      dispatch(logout())
      toast.success('Logout successful!')

    } catch (error) {
      toast.error('Logout failed!')
    }
  }

  const renderMenu = () => {
    const menuItem = []
    for (let i = 0; i < 4; i++) {
      menuItem.push(<div key={i} className={`menu__wrapper__item ${!isMenuOpen ? 'menu__wrapper__color' : ''}`}></div>)
    }
    return (
      <div className={`menu__wrapper ${isMenuOpen ? 'menu__wrapper__color' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {menuItem}        
      </div>
    )
  }

  const renderMenuBar = () => {
    if (isMenuOpen) {
      return (
          <ul>
            {renderNavLink()}
          </ul>
      )
    }
  }



  const renderNavLink = () => {
    if (accessToken) {
      return (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <button onClick={handleLogout} >Logout</button>
          </li>
        </>
      )
    } else if (!accessToken) {
      return (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
         
        </>
      )
    }
  }

  return (
    <header className='header' onMouseLeave={()=> setIsMenuOpen(false)}>
        <nav className='header__nav'>
        {renderMenu()}
        {renderMenuBar()}
      </nav>
    </header>
  )
}

export default Header
