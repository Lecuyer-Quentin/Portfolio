import LastProjectsItem from './LastProjectsItem'
import { useGetProjectsQuery } from '../../app/api/projectsSlice'

const LastProjects = () => {

  const { data: projects = [], isFetching } = useGetProjectsQuery()


  const renderProjects = () => {
    const sortedProjects = [...projects].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
    )
    const lastProjects = sortedProjects.slice(0, 3)
    
    if (isFetching) return <div>Loading...</div>
    return lastProjects.map((project) => {
      return (
        <LastProjectsItem key={project._id} project={project} />
      )
    })
  }
    

  return (
    <>
      <div className='last-projects__container'>
        {renderProjects()}
      </div>
      <a href="/projects" className="last-projects__container__link">See more</a>
    </>
   
  )
}

export default LastProjects