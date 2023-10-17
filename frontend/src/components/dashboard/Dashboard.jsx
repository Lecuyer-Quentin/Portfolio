import { useGetProjectsQuery } from "../../app/api/projectsSlice" 
import ProjectItem from "../projects/ProjectItem"

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
    const sortedProjects = [...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return (
      <div>
        {sortedProjects.map((project) => (
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
