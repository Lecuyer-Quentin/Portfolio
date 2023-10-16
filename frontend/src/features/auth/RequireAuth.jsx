import { Outlet, Navigate } from 'react-router-dom'
// import { setAuth } from '../../app/api/authSlice'
import { useSelector } from 'react-redux'
import { selectAccessToken } from '../../app/api/authSlice'
import { selectIsAuthenticated } from '../../app/api/authSlice'
// import { selectIsAuthenticated } from '../../app/api/authSlice'

const RequireAuth = () => {
  const accessToken = useSelector(selectAccessToken)
  // const isAuthenticated = useSelector(selectIsAuthenticated)
    const render = () => {
        return accessToken ? <Outlet /> : <Navigate to="/login"/>
    }   
  return (
    <>
      {render()}
    </>
  )
}

export default RequireAuth