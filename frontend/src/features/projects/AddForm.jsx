import { useEffect, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAddProjectMutation } from "../../app/api/projectsSlice"

//! problème avec Images et technologies

const initialState = {
    name: '',
    description: '',
    images: [{url: '', alt: ''},],
    imagePreview: [],
    technologies: [{name: ''},],
    link: '',
    owner: '',
    selectedTechnologies: [],
}
const technologyOptions = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Redux',
    'Node',
    'Express',
    'MongoDB',
    'Mongoose',
    'Python',
    'Flask',
    'SQL',
    'PostgreSQL',
    'Sequelize',
    'Django',
    'Ruby',
    'Rails',
    'C#',
    'ASP.NET',
    'C++',
    'Java',
    'Spring',
]
    
const reducer = (state, action) => {
    switch(action.type) {
        case 'name':
            return {...state, name: action.payload}
        case 'description':
            return {...state, description: action.payload}
        case 'images':
            return {
                ...state,
                images: [{url: action.payload, alt: state.name },],
            }
        case 'imagePreview':
            return { ...state, imagePreview: action.payload }
        case 'addImage':
            return {
                ...state,
                images: [ {
                    url: action.payload,
                    alt: state.name,
                }, ...state.images
                ],
                imagePreview: [...state.imagePreview, action.payload]
            }
        case 'deleteImage':
            return {
                ...state,
                images: state.images.filter((img, id) => id !== action.payload),
                imagePreview: state.imagePreview.filter((img, id) => id !== action.payload)
            }
        case 'link':
            return {...state, link: action.payload}
        case 'owner':
            return { ...state, owner: action.payload }
        case 'technologies':
            return {
                ...state, 
                technologies: [{ name: action.payload }],
            }
        case 'selectedTechnologies':
            return { ...state, selectedTechnologies: action.payload }
        case 'addTechnologies':
            return {
                ...state,
                technologies: [{
                    name: action.payload,
                }, ...state.technologies
                ],
                selectedTechnologies: [],
            }
        case 'deleteTechnologies':
            return {
                ...state, 
                technologies: state.technologies.filter((tech, id) => id !== action.payload),
                selectedTechnologies: state.selectedTechnologies.filter((tech, id) => id !== action.payload)
            }
        case 'deleteAllTechnologies':
            return { ...state, technologies: [], selectedTechnologies: [] }
        case 'clearForm':
            return { ...initialState}
        
        default:
            return state
    }
}


const AddForm = () => {
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(reducer, initialState)
    const { name, description, images = [], technologies = [], link, owner, selectedTechnologies, imagePreview } = state
    const [addProject,] = useAddProjectMutation()

    useEffect(() => {
        if (window.reload || window.location.pathname !== '/dashboard/add') {
            dispatch({ type: 'clearForm' })
        }
    }, [window.reload, window.location.pathname])


    //? /////////////////////////////////////////////////////////////
    const handleChange = (e) => {
        dispatch({type: e.target.name, payload: e.target.value})
    }
    const handleImageChange = (e) => {
        const file = e.target.files
        if (file) {
            for (let i = 0; i < file.length; i++) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    dispatch({ type: 'addImage', payload: e.target.result})
                }
                reader.readAsDataURL(file[i])
                console.log(file[i])
            }
        }
    }
    console.log("AtChange:", images)
    
    const handleDrop = (e) => {
        e.preventDefault()
        // e.stopPropagation()
        const files = e.dataTransfer.files
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    dispatch({ type: 'addImage', payload: e.target.result })
                }
                reader.readAsDataURL(files[i])
            }
        }
    }
    const handleDeleteImage = (e) => {
        dispatch({ type: 'deleteImage', payload: e })
    }
    //? //////////////////////////////////////////////////////////////////////


    const handleTechnologiesChange = (e) => {
        const selectedTech = Array.from(e.target.selectedOptions, (option) => option.value)
        dispatch({ type: 'selectedTechnologies', payload: selectedTech })
    }
    const handleAddTechnologies = (e) => {
        e.preventDefault()
        dispatch({ type: 'addTechnologies', payload: selectedTechnologies })
    }
    //! Do not work
    const handleDeleteTechnologies = (e) => {
        e.preventDefault()
        dispatch({ type: 'deleteTechnologies', payload: e.target.id })
    }
    
    const handleDeleteAllTechnologies = (e) => {
        e.preventDefault()
        dispatch({ type: 'deleteAllTechnologies' })
    }
    const handleClearForm = (e) => {
        e.preventDefault()
        dispatch({ type: 'clearForm' })
    }
   

    const handleURLBlob = async (image) => {
        try {
            const res = await fetch(image)
            const blob = await res.blob()
            console.log('Blob Image', blob)
            return blob
        } catch (error) {
            console.log(error.message)
        }
    }


    

    const handleSubmit = async (e) => {


        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('link', link)
            formData.append('owner', owner)
            formData.append('createdAt', new Date())
            formData.append('updatedAt', new Date())

            //! //////////////////////
            if (images.length > 0) {
                images.map(async (image) => {
                    const blob = await handleURLBlob(image.url)
                    console.log('Blob in Submit', blob)
                    formData.append('images', blob, image.name)
                })
            }
            //! //////////////////////

            technologies.map((technology) => {
                formData.append('technologies', technology.name)
            })
            console.log('Form Data:', formData)

            await addProject(formData).unwrap()
            dispatch({ type: 'clearForm' })
            navigate('/dashboard')
            window.location.reload()
        
        } catch (error) {
            console.log(error.message)
        }
    }

    

    const renderForm = () => {
        return (
            <section style={formStyle}>

                {/* /////////////////////////////////////// */}
                <form onSubmit={handleSubmit} method="post" encType="multipart/form-data" >
                    { /* /////////////////////////////////////// */}

                    <label style={labelStyle} htmlFor="name">Name</label>
                    <input style={inputStyle} type="text" name="name" value={name} onChange={handleChange} /> 
                    <label style={labelStyle} htmlFor="description">Description</label>
                    <input style={inputStyle} type="text" name="description" value={description} onChange={handleChange} />

                    <div style={dropAreaStyle} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                        {imagePreview ? (
                            imagePreview.map((img, id) => (
                                <div key={id}>
                                    <img style={imageStyle} src={img} alt={name} />
                                    <button style={buttonStyle} onClick={() => handleDeleteImage(id)}>Delete</button>
                                </div>
                            ))
                        ) : (<p>Drop Image Here</p>)
                        }
                        <input style={inputStyle} type="file" name="images" onChange={handleImageChange} multiple />


                            
                    </div> 

                    <label style={labelStyle} htmlFor="technologies">Technologies</label>
                    <input style={inputStyle} type="text" name="selectedTechnologies" value={technologies.join(', ')} readOnly
                        placeholder="Select Technologies"
                    />
                    <select style={inputStyle} name="technologies" multiple value={selectedTechnologies} onChange={handleTechnologiesChange}>
                        {technologyOptions.map((tech, id) => (
                            <option key={id} value={tech}>
                                {tech}
                            </option>

                        ))}
                    </select>
                    
                    <button style={buttonStyle} onClick={handleAddTechnologies}>+</button>
                    <button style={buttonStyle} onClick={handleDeleteAllTechnologies}>Clear All</button>

                    <label style={labelStyle} htmlFor="link">Link</label>
                        <input style={inputStyle} type="text" name="link" value={link} onChange={handleChange} />
                    <label style={labelStyle} htmlFor="owner">Owner</label>
                    <input style={inputStyle} type="text" name="owner" value={owner} onChange={handleChange} />
                    <>
                        <button style={buttonStyle}>Add Project</button>
                        <button style={buttonStyle} onClick={handleClearForm}>Clear Form</button>
                    </>
                    
                </form>
            </section>
            
        )
    }
    return (
        <>
            {renderForm()}
        </>
  )
}

export default AddForm




    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        width: '60%',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
    }

    const inputStyle = {
        width: '100%',
        marginBottom: '15px',
        paddingBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '3px',
        fontSize: '16px',
    }

    const labelStyle = {
        display: 'block',
        fontSize: '18px',
        fontWeight: 'bold',
    }

    const buttonStyle = {
        width: '45%',
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        fontSize: '18px',
        cursor: 'pointer',
    }

    const dropAreaStyle = {
        border: '2px dashed #ccc',
        borderRadius: '3px',
        width: '80%',
        padding: '25px',
        textAlign: 'center',
        fontSize: '20px',
        margin: '0 auto',
    }

    const imageStyle = {
        width: '100%',
    }

