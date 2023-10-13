import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
      <p>Projects</p>
      <Outlet />
    </div>
  )
}

export default Layout