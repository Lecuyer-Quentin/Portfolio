import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../../app/api/authSlice"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAccessToken } from "../../app/api/authSlice"
import {toast} from 'react-toastify'

const Footer = () => {
  const accessToken = useSelector(selectAccessToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const notifyLogout = () => toast.success('Logout successful!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
  })

  const handleLogout = () => {
    try {
      dispatch(logout())
      // navigate('/')
      // window.location.reload()
      notifyLogout()
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const renderAuthLinks = () => {
    if (accessToken !== undefined) {
      if(accessToken) {
        return (
          <>
            <button onClick={handleLogout}>Logout</button>
            <button><Link to="/dashboard">Dashboard</Link></button>
          </>
        )
      } else {
        return (
          <>
            <button><Link to="/login">Login</Link></button>
          </>
        )
      }
    }
  }

  return (
    <footer>
      <div className="container">
        <div className="footer__links">
          {renderAuthLinks()}
        </div>
      </div>
    </footer>
  )
}

export default Footer