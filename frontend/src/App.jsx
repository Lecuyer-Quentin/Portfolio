import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Layout'
import Public from './components/public/Public'
import Dashboard_Layout from './pages/Dashboard/Layout'
import Dashboard from './components/dashboard/Dashboard'
import RequireAuth from './features/auth/RequireAuth'
import Login from './pages/Login'
import ProjectsPage from './pages/Projects/Layout'
import ProjectsList from './components/ProjectsList'
import ProjectDetails from './components/ProjectDetails'
import AddForm from './features/projects/AddForm'


function App() {
 

  
  

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
            <Route path='add' element={<AddForm />} />
            
          </Route>
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  )
}

export default App
