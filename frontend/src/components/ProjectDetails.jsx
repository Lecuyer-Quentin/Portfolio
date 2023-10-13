import { useGetProjectQuery } from "../app/api/projectsSlice"
import { useParams } from "react-router-dom"
import ProjectItem from "./ProjectItem"

const ProjectDetails = () => {

    const { id } = useParams()
    const { data: project, isLoading } = useGetProjectQuery(id)

    console.log('project', project)
    const render = () => {
        if (isLoading) return <p>Loading...</p>
        return (
            <div>
                <ProjectItem key={project._id} {...project} />
            </div> 
        )
    }

    return (
        <>
            {render()}
        </>
    )
}


export default ProjectDetails
