import { Link } from 'react-router-dom'
// import { useGetUsersQuery } from '../../app/api/usersSlice'
import { useLocation } from 'react-router-dom'

const DashHeader = () => {
  const path = useLocation().pathname
  const currentUser = localStorage.getItem('user').toUpperCase()
  
  const renderButton = () => {
    if (path === '/dashboard') return <Link to='/dashboard/add'><button>Add Project</button></Link>
    if (path === '/dashboard/add') return <Link to='/dashboard'><button>Back to Dashboard</button></Link>
  }
 
  const render = () => {
    return (
      <div>
        <h1>Welcome to your dashboard {currentUser}</h1>
      </div>
    )
  }

  return (
    <div style={
      {display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem', 
      backgroundColor: 'lightgrey', 
      height: '10vh', 
      marginBottom: '1rem'
      }}>

      {render()}
      {renderButton()}
    </div>   
    
  )
}

export default DashHeader