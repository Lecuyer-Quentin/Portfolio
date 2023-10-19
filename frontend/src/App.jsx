import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Layout'
import Public from './components/public/Public'
import Dashboard_Layout from './pages/Dashboard/Layout'
import Dashboard from './components/dashboard/Dashboard'
import RequireAuth from './features/auth/RequireAuth'
import Login from './pages/Login'
import ProjectsPage from './pages/Projects/Layout'
import ProjectsList from './components/projects/ProjectsList'
import ProjectDetails from './components/projects/ProjectDetails'
import AddProjects from './features/projects/AddProjects'
import EditForm from './features/projects/EditForm'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from './app/api/authSlice'
// import Form from './features/projects/Form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem('token')
  const notifyLostToken = () => toast.error('Session expired! Please login again.', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
  })

  useEffect(() => {
    if (!accessToken) return
    notifyLostToken()
    dispatch(logout())
  }
    , [dispatch])
 

  return (
    <Routes>
      <Route path="/*" element={<Home />}>
        {/* Public Routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="projects" element={<ProjectsPage />} > 
          <Route index element={<ProjectsList />} />
          <Route path=":id" element={<ProjectDetails />} />
        </Route>

        {/* Private Routes */}
        <Route element={<RequireAuth />} >
          <Route path="dashboard" element={<Dashboard_Layout />} >
            <Route index element={<Dashboard />} />
            <Route path='add' element={<AddProjects />} />
            <Route path='edit/:id' element={<EditForm />} />
            
          </Route>
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  )
}

export default App
