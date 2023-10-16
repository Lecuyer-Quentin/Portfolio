import { Link } from 'react-router-dom'
import { useDeleteProjectMutation, useGetProjectQuery } from '../app/api/projectsSlice'
import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useReducer } from 'react';



const initialState = {
    name: '',
    description: '',
    image: [{ url: '', name: ''}],
    technologies: [{ name: ''}],
    link: '',
    owner: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'name':
            return { ...state, name: action.payload }
        case 'description':
            return { ...state, description: action.payload }
        case 'image':
            return {
                ...state,
                images: [{
                    url: action.payload,
                    name: action.payload
                }]
            }
        case 'technologies':
            return {
                ...state,
                technologies: [{
                    name: action.payload
                }]
            }
                    
        case 'link':
            return { ...state, link: action.payload }
        case 'owner':
            return { ...state, owner: action.payload }
        default:
            return state
    }
}
        
const ProjectItem = ({_id}) => {
    const path = window.location.pathname 
    const reload = () => window.location.reload()
    const { data: project, isLoading } = useGetProjectQuery(_id)
    const [state, dispatch] = useReducer(reducer, initialState)
    const [deleteProject] = useDeleteProjectMutation() 

    useEffect(() => {
        if (isLoading) return
        dispatch({ type: 'name', payload: project.name })
        dispatch({ type: 'description', payload: project.description })
        dispatch({
            type: 'image', 
            payload: project.images.map((image) => {
                // console.log('Image Item:', image)
                return { url: image.url, name: image.name }
            })
        })
        dispatch({
            type: 'technologies',
            payload: project.technologies.map((technology) => {
                return { name: technology.name }
            })
        })
        dispatch({ type: 'link', payload: project.link })
        dispatch({ type: 'owner', payload: project.owner })
    }, [project, isLoading])

    // console.log(project)
    // console.log(state)

    
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
                    <Link to={`/dashboard/edit/${_id}`}>
                        <button className='view-button'>Modifier</button>
                    </Link>
                    <button className='view-button' onClick={handleDelete}>Supprimer</button>
                </>
            )
        }
        return (
            <Link to={`/projects`}>
                <button className='view-button'>Retour</button>
            </Link>
            
        )
    }

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        centerMode: true,
    }

    const renderSlider = () => {
        if(isLoading) {
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
                {state.image.map((image, index) => (
                    <div key={index}>
                        <img src={state.image.url} alt='project' />
                    </div>
                ))}
            </Slider>
        )
    }

    const renderCard = () => {
        return (
            <div className='project-card'>
                <div className='project-card-header'>
                    <h2>{state.name}</h2>
                </div>
                <div className='project-card-body'>
                    <div className='project-card-body-image'>
                        {renderSlider()}
                    </div>
                    <div className='project-card-body-info'>
                        <p>Descriptions: {state.description}</p>
                        {/* <p>Tech: {state.technologies}</p> */}
                        {/* {state.technologies.map((technology, index) => (
                            <p key={index}>Technologie: {technology.name}</p>
                        ))} */}
                        
                            
                        <p>GitHub: {state.link}</p>
                        <p>Créateur: {state.owner}</p>
                    </div>

                </div>
                <div className='project-card-footer'>
                    {renderButton()}
                </div>
            </div>
        )
    }

  return (
      <>
        {renderCard()}
    </>
  )
    
}


export default ProjectItem