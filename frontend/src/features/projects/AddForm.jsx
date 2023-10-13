import { useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAddProjectMutation } from "../../app/api/projectsSlice"

//! problème avec le select link

const initialState = {
    name: '',
    description: '',
    image: '',
    technologies: [],
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
        case 'image':
            return {...state, image: action.payload}
        case 'technologies':
            return {...state, selectedTechnologies: action.payload}
        case 'links':
            return {...state, links: action.payload}
        case 'owner':
            return { ...state, owner: action.payload }
        case 'addTechnologies':
            return { ...state, technologies: [...state.technologies, action.payload] }
        case 'deleteTechnologies':
            return { ...state, technologies: [] }
        default:
            return state
    }
}


const AddForm = () => {
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(reducer, initialState)
    const { name, description, image, technologies, links, owner, selectedTechnologies } = state
    const [addProject] = useAddProjectMutation()
    const [imagePreview, setImagePreview] = useState(null)


    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target.result)
                dispatch({type: 'image', payload: e.target.result})
            }
            reader.readAsDataURL(file)
        }
    }
    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const file = e.dataTransfer.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target.result)
                dispatch({ type: 'image', payload: e.target.result })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleTechnologiesChange = (e) => {
        const selectedTech = Array.from(e.target.selectedOptions, option => option.value)
        dispatch({ type: 'technologies', payload: selectedTech })
    }
    const handleAddTechnologies = (e) => {
        e.preventDefault()
        dispatch({ type: 'addTechnologies', payload: selectedTechnologies })
    }
    const handleDeleteTechnologies = (e) => {
        e.preventDefault()
        dispatch({ type: 'deleteTechnologies' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const project = { name, description, image, technologies, links, owner }
        console.log(technologies)
        try {
            await addProject(project).unwrap()
            navigate('/dashboard')
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        dispatch({type: e.target.name, payload: e.target.value})
    }

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




    const renderForm = () => {
        return (
            <section style={formStyle}>
                <form onSubmit={handleSubmit}>
                    <label style={labelStyle} htmlFor="name">Name</label>
                        <input style={inputStyle} type="text" name="name" value={name} onChange={handleChange} required />
                    <label style={labelStyle} htmlFor="description">Description</label>
                    <input style={inputStyle} type="text" name="description" value={description} onChange={handleChange} required />
                    


                    <div style={dropAreaStyle} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                        {imagePreview ?
                            <img style={imageStyle} src={imagePreview} alt="preview" />
                            : 'Drag & Drop or Click max 10mo jpg/png/svg'}
                        <input
                            type="file" name="image" onChange={handleImageChange} />
                    </div> 

                    <label style={labelStyle} htmlFor="technologies">Technologies</label>
                    <input style={inputStyle} type="text" name="selectedTechnologies" value={technologies.join(', ')} readOnly />

                    <select style={inputStyle} name="technologies" multiple value={selectedTechnologies} onChange={handleTechnologiesChange}>
                        {technologyOptions.map((tech) => (
                            <option key={tech} value={tech}>{tech}</option>
                        ))}
                    </select>

                    <button style={buttonStyle} onClick={handleAddTechnologies}>Add Technology</button>
                    <button style={buttonStyle} onClick={handleDeleteTechnologies}>Clear Technologies</button>



                    <label style={labelStyle} htmlFor="links">Links</label>
                        <input style={inputStyle} type="text" name="links" value={links} onChange={handleChange} />
                    <label style={labelStyle} htmlFor="owner">Owner</label>
                        <input style={inputStyle} type="text" name="owner" value={owner} onChange={handleChange} />
                    <button style={buttonStyle} type="submit">Add Project</button>
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