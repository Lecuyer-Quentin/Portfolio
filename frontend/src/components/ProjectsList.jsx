import { useGetProjectsQuery } from "../app/api/projectsSlice";
import ProjectItem from "./ProjectItem";

const ProjectsList = () => {
    const { data: projects = [], isFetching } = useGetProjectsQuery()

    const render = (projects, isFetching) => {
        if (isFetching) {
            return <div>Loading...</div>
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
        <div>
            <h1>Projects</h1>
            {render(projects, isFetching)}
        </div>
    )
}

export default ProjectsList
