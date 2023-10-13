import { Link } from 'react-router-dom'

const Header = () => {

  const renderNavLink = () => {
    return (
      <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </>
    )
  }
  return (
    <header>
      <div className="container">
        <div className="header__logo">
          <Link to="/">Logo</Link>
        </div>
        <nav className="header__nav">
          <ul>
            {renderNavLink()}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header