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
            <>
                {sortedProjects.map((project) => (
                    <ProjectItem key={project._id} _id={project._id} />   
                ))}   
            </> 
        )
    }

    return (
        <article className="projects__list">
            {/* <h1>Projects</h1> */}
            {render(projects, isFetching)}
        </article>
    )
}

export default ProjectsList
