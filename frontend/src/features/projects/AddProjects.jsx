import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import { useAddProjectMutation } from '../../app/api/projectsSlice'
import { toast } from 'react-toastify'

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


const AddProjects = () => {
    const navigate = useNavigate()
    const [addProject, { isLoading, error }] = useAddProjectMutation()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [owner, setOwner] = useState('')

    const [imageFiles, setImageFiles] = useState([])
    const [imageFilesToUpload, setImageFilesToUpload] = useState([])
    const [imageFilesToDelete, setImageFilesToDelete] = useState([])

    const [technologies, setTechnologies] = useState([])
    const [technologiesToAdd, setTechnologiesToAdd] = useState([])
    const [technologiesToDelete, setTechnologiesToDelete] = useState([])

    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const canSave = [title, description].every(Boolean) && addRequestStatus === 'idle'

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name === 'title') setTitle(value)
        if (name === 'description') setDescription(value)
        if (name === 'link') setLink(value)
        if (name === 'owner') setOwner(value)
    }
    
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        if (files.length > 0) {
            const reader = new FileReader()
            reader.onload = () => {
                setImageFiles(prevState => [...prevState, reader.result])
            }
            reader.readAsDataURL(files[0])
            setImageFilesToUpload(prevState => [...prevState, files[0]])
        }
    }

    const handleImagesDrop = (e) => {
        e.preventDefault()
        const files = Array.from(e.dataTransfer.files)
        if (files.length > 0) {
            const reader = new FileReader()
            reader.onload = () => {
                setImageFiles(prevState => [...prevState, reader.result])
            }
            reader.readAsDataURL(files[0])
            setImageFilesToUpload(prevState => [...prevState, files[0]])
        }
    }

    const handleImagesDelete = (e) => {
        const index = parseInt(e.target.id)
        setImageFiles(prevState => prevState.filter((_, i) => i !== index))
        setImageFilesToUpload(prevState => prevState.filter((_, i) => i !== index))
        if (index < imageFiles.length) {
            setImageFilesToDelete(prevState => [...prevState, imageFiles[index]])
        }
    }

     const handleDeleteAllImages = (e) => {
        e.preventDefault()
        setImageFilesToDelete(prevState => [...prevState, ...imageFiles])
        setImageFiles([])
        setImageFilesToUpload([])
    }

    const handleTechnologiesChange = (e) => {
        const tech = Array.from(e.target.selectedOptions, option => option.value)
        setTechnologies(tech)
    }

    const handleTechnologiesAdd = (e) => {
        e.preventDefault()
        setTechnologiesToAdd(prevState => [...prevState, ...technologies])
        setTechnologies(prevState => prevState.filter(tech => !technologies.includes(tech)))
    }

    const handleDeleteTechnologies = (e) => {
        e.preventDefault()
        setTechnologies(prevState => prevState.filter(tech => !technologies.includes(tech)))
        setTechnologiesToAdd(prevState => prevState.filter(tech => !technologies.includes(tech)))
    }

    const handleDeleteAllTechnologies = (e) => {
        e.preventDefault()
        setTechnologiesToDelete(prevState => [...prevState, ...technologiesToAdd])
        setTechnologiesToAdd([])
    }

    const handleClearForm = (e) => {
        e.preventDefault()
        setTitle('')
        setDescription('')
        setLink('')
        setOwner('')
        setImageFiles([])
        setImageFilesToUpload([])
        setImageFilesToDelete([])
        setTechnologies([])
        setTechnologiesToAdd([])
        setTechnologiesToDelete([])
    }

    const handleAddProject = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            formData.append('link', link)
            formData.append('owner', owner)
            technologiesToAdd.forEach(tech => formData.append('technologies', tech))

            console.log('formData', formData)
            console.log('title', formData.getAll('title'))
            console.log('description', formData.getAll('description'))
            console.log('link', formData.getAll('link'))
            console.log('owner', formData.getAll('owner'))
            console.log('technologies', formData.getAll('technologies'))

            const result = await addProject(formData)
            console.log('result', result)

            //! Récupérer l'id du projet ajouté 
            //! return undefined
            // const { _id } = unwrapResult(result)
            // console.log('_id', _id)
            


            // const formDataImages = new FormData()
            // imageFilesToUpload.forEach(image => formDataImages.append('images', image))
            // formDataImages.append('projectId', _id)
            // console.log('images', formDataImages.getAll('images'))
            // const resultActionImages = await uploadImages(formDataImages)

            // const { images } = resultActionImages.payload
            // console.log('images', images)

            toast.success('Project added successfully')
            navigate(`/dashboard`)
            window.location.reload()

        } catch (err) {
            toast.error('Failed to add the project')
            console.log('Failed to add the project', err)
        }

    }

    //! a revoir
    const renderInput = (name, label, type = 'text') => {
        return (
            <>
                <label htmlFor={name} style={labelStyle}>{label} </label>
                <input
                    style={inputStyle}
                    type={type}
                    className="form-control"
                    id={name}
                    name={name}
                    value={name === 'title' ? title : name === 'description' ? description : name === 'link' ? link : owner}
                    onChange={handleInputChange}
                />
            </>
        )
    }

    const renderImages = () => {
        return (
            <>
                <label htmlFor="images">Images</label>
                <div style={dropAreaStyle} onDrop={handleImagesDrop} onDragOver={(e) => e.preventDefault()}>
                    <>
                        {/* <i className="fas fa-cloud-upload-alt"></i> */}
                        <p>Drag & Drop images here or click to upload</p>
                    </>
                
                    {imageFiles.map((image, id) => (
                        <div key={id}>
                            <img style={imageStyle} src={image} alt='' />
                            <button style={buttonStyle} id={id} onClick={handleImagesDelete}>
                                {/* <i className="fas fa-trash-alt"></i> */}
                            </button>
                        </div>
                    ))}
                    <input style={inputStyle} type="file" id="images" name="images" accept="image/*" onChange={handleImageChange} multiple/>
                </div>
                <button style={buttonStyle} onClick={handleDeleteAllImages}>
                    Delete all images
                </button>
            </>
        )
    }

    const renderTechnologies = () => {
        return (
            <>
                <label style={labelStyle} htmlFor="technologies">Technologies</label>
                <input style={inputStyle} type="text" id="technologies" name="technologies" value={technologiesToAdd} onChange={handleTechnologiesChange} multiple />
                <select
                    style={inputStyle}
                    multiple
                    id="technologies"
                    name="technologies"
                    value={technologies}
                    onChange={handleTechnologiesChange}
                >
                    {technologyOptions.map((tech, id) => (
                        <option key={id} value={tech}>
                            {tech}
                        </option>
                    ))}
                </select>
                <button style={buttonStyle} onClick={handleTechnologiesAdd}>
                    Add
                </button>
                <button style={buttonStyle} onClick={handleDeleteTechnologies}>
                    Delete
                </button>
                <button style={buttonStyle} onClick={handleDeleteAllTechnologies}>
                    Delete all technologies
                </button>
            </>
        )

    }

    const renderForm = () => {
        if (isLoading) return <h2>Loading...Ajouter Loader</h2>
        return (
            <form onSubmit={handleAddProject} method='post' encType='multipart/form-data'>
                {renderInput('title', 'Title')}
                {renderInput('description', 'Description')}
                {renderImages()}
                {renderTechnologies()}
                {renderInput('link', 'Link')}
                {renderInput('owner', 'Owner')}
                
                <button style={buttonStyle} disabled={!canSave} >
                    Add
                </button>
                <button style={buttonStyle} onClick={handleClearForm}>
                    Clear
                </button>
            </form>
        )
    }

  return (
      <section style={formStyle}>
          {renderForm()}
    </section>  
  )
}

export default AddProjects


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