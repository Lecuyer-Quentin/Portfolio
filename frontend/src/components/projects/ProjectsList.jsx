import { useGetProjectsQuery } from "../../app/api/projectsSlice";
import ProjectItem from "./ProjectItem";

const ProjectsList = () => {
    const { data: projects = [], isFetching } = useGetProjectsQuery()

    const render = (projects, isFetching) => {
        if (isFetching) {
            return <div>Loading...</div>
        }
        const sortedProjects = [...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        return (
            <div>
                {sortedProjects.map((project) => (
                    <ProjectItem key={project._id} _id={project._id} />   
                ))}   
            </div> 
        )
    }

    return (
        <div>
            <h1>Projects</h1>
            {render(projects, isFetching)}
        </div>
    )
}

export default ProjectsList
