import { Link } from 'react-router-dom'
import { useDeleteProjectMutation } from '../app/api/projectsSlice'
// import { useNavigate } from 'react-router-dom'


const ProjectItem = (project) => {
    const path = window.location.pathname 
    const reload = () => window.location.reload()
    const { _id, name, description, owner, image, technologies, link, createdAt, updateAt } = project
    const [deleteProject] = useDeleteProjectMutation()
    
    const handleDelete = async () => {
        try {
            await deleteProject(_id).unwrap()
            reload()
            
        } catch (error) {
            console.log(error.message)
        }
    }


    const renderButton = () => {
        if(path === `/projects`) {
            return (
                <Link to={`/projects/${_id}`}>
                    <button className='view-button'>Voir plus</button>
                </Link>
            )
        }
        if(path === `/dashboard`) {
            return (
                <>
                    <button className='edit-button'>Modifier</button>
                    <button className='delete-button' onClick={handleDelete}>Supprimer</button>
                </>
            )
        }
    }

   

    const render = () => {
        return (
            <div className='project-card'>
                <div className='project-image'>
                    <img src={image} alt = {name} />
                </div>
                <div className='project-info'>
                    <h3>{name}</h3>
                    <p className='project-description'>{description}</p>
                    <p className='project-owner'>Owner: {owner}</p>
                    <p className='project-technologies'>Technologies: {technologies.join(', ')}</p>
                    <p className='project-link'>Link: {link}</p>
                    <p className='project-dates'>
                        <span>Created At: {createdAt}</span>
                        <span>Updated At: {updateAt}</span>
                    </p>
                </div>
                    {renderButton()}
            </div >
        )
    }

  return (
    <>
        {render(project)}
    </>
  )
    
}


export default ProjectItem