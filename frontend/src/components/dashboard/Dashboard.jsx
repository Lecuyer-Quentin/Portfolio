import { useGetProjectsQuery } from "../../app/api/projectsSlice" 
import ProjectItem from "../ProjectItem"

const Dashboard = () => {
  const { data: projects = [], isFetching, error } = useGetProjectsQuery()

  const renderProjects = (projects, isFetching) => {
    if (isFetching) {
      return <div>Loading...</div>
    }
    if (error) {
      return <div>Error: {error.message}</div>
    }
    if (!projects) {
      return null
    }
    return (
      <div>
        {projects.map((project) => (
          <ProjectItem key={project._id} {...project} />
        ))}
      </div>
    )
  }
  return (
    <>
      {renderProjects(projects, isFetching)}
    </>
  )

}

export default Dashboard
