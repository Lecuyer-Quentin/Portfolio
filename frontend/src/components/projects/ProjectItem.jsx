import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner'
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { useDeleteProjectMutation, useGetProjectQuery } from '../../app/api/projectsSlice';
import img1 from '../../assets/logos/mongodb.png';
import img2 from '../../assets/logos/node-logo.png';
import img3 from '../../assets/logos/react-logo.png';

const ProjectItem = ({ _id }) => {
    const { data: project, isLoading } = useGetProjectQuery(_id)
    const navigate = useNavigate()
    const path = window.location.pathname
    const reload = () => window.location.reload()
    const [deleteProject] = useDeleteProjectMutation()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [owner, setOwner] = useState('')
    const [images, setImages] = useState([])
    const [techs, setTechs] = useState([])
    
    // console.log(project)



    useEffect(() => {
        if (isLoading) return
        setTitle(project.title)
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

    const img =[img1, img2, img3]

    const renderImages = () => {
        return img.map((image, index) => {
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


    //! a revoir
    const renderButtons = () => {
        if (path === '/projects') {
            return (
                <Link to={`/projects/${_id}`}>
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
        infinite: true,
        speed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
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
            <div className='projects__list__item'>
                <h3 className='projects__list__item__title'>{title}</h3>
                <div className='projects__list__item__images'>
                    {renderSlider()}
                </div>
                <div className='projects__list__item__info'>
                    <p className='projects__list__item__info__description'>Description: {description}</p>
                    <div className='projects__list__item__info__techs'>
                        {renderTechs()}
                    </div>
                    <p className='projects__list__item__info__link'>GitHub:
                        <a>Lien{link}</a>
                    </p>
                    <p className='projects__list__item__info__owner'>Owner: {owner}</p>
                </div>
                <div className='projects__list__item__button'>
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

    