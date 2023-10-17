import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDeleteProjectMutation, useGetProjectQuery } from '../../app/api/projectsSlice';

const ProjectItem = ({ _id }) => {
    const { data: project, isLoading } = useGetProjectQuery(_id)
    const navigate = useNavigate()
    const path = window.location.pathname
    const reload = () => window.location.reload()
    const [deleteProject] = useDeleteProjectMutation()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [owner, setOwner] = useState('')
    const [imagesP, setImages] = useState([])
    const [techs, setTechs] = useState([])
    
    console.log(project)



    useEffect(() => {
        if (isLoading) return
        setName(project.name)
        setDescription(project.description)
        setImages(project.images)
        setTechs(project.technologies)
        setLink(project.link)
        setOwner(project.owner)
    }, [isLoading, project])

    const handleDelete = async () => {
        await deleteProject(_id)
        reload()
    }

    const renderImages = () => {
        return imagesP.map((image, index) => {
            return (
                <div key={index}>
                    <img src={image} alt={project.name} />
                </div>
            )
        })
    }

    const renderTechs = () => {
        return techs.map((tech, index) => {
            return (
                <div key={index}>
                    <p>{tech}</p>
                </div>
            )
        })
    }

    const renderButtons = () => {
        if (path === '/projects') {
            return (
                <Link to={`/projects/${_id}`}>,
                    <button>View more</button>
                </Link>
            )
        } else if (path === `/dashboard`) {
            return (
                <>
                    <Link to={`/dashboard/edit/${_id}`}>
                        <button>Edit</button>
                    </Link>
                    <button onClick={handleDelete}>Delete</button>

                </>
            )
        } else {
            return (
                <Link to={`/projects`}>
                    <button>Back</button>
                </Link>
            )
        }
        
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: true,
        slidesToScroll: 1
    };

    const renderSlider = () => {
        if (isLoading) {
            return <InfinitySpin
                color='black'
                size={200}
                speed={1}
                visible={true}
                ariaLabel='three circles loading'
            />
        }
        return (
            <Slider {...settings}>
                {renderImages()}
            </Slider>
        )
    }

    const renderProject = () => {
        return (
            <div className='project-item'>
                <div className='project-item__image'>
                    {renderSlider()}
                </div>
                <div className='project-item__info'>
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <div className='project-item__info__techs'>
                        {renderTechs()}
                    </div>
                    <p>{link}</p>
                    <p>{owner}</p>
                    {renderButtons()}
                </div>
            </div>
        )
    }


    return (
        <>
            {renderProject()}
        </>
    )

}

export default ProjectItem

    