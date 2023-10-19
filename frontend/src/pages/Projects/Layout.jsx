import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <section className="projects">
      <h3>Projects</h3>
      <Outlet />
    </section>
  )
}

export default Layout