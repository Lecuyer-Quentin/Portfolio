import { useUpdateProjectMutation, useGetProjectQuery } from "../../app/api/projectsSlice";
import { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  description: "",
  image: [],
  technologies: [],
  link: "",
  owner: "",
  selectedTechnologies: [],
};

const technologyOptions = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Redux",
  "Node",
  "Express",
  "MongoDB",
  "Mongoose",
  "Python",
  "Flask",
  "SQL",
  "PostgreSQL",
  "Sequelize",
  "Django",
  "Ruby",
  "Rails",
  "C#",
  "ASP.NET",
  "C++",
  "Java",
  "Spring",
];

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "description":
      return { ...state, description: action.payload };
    case "image":
      return { ...state, image: action.payload };
    case "technologies":
      return { ...state, selectedTechnologies: action.payload };
    case "link":
      return { ...state, link: action.payload };
    case "owner":
      return { ...state, owner: action.payload };
    case "addTechnologies":
      return {
        ...state,
        technologies: [...state.technologies, action.payload],
      };
    case "deleteTechnologies":
      return { ...state, technologies: [] };
    case "clearForm":
        return { ...initialState };
    case "deleteImage":
        const newImage = [...state.image];
        newImage.splice(action.payload, 1);
        return { ...state, image: newImage };
      
      
    default:
      return state;
  }
};

const EditForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, description, image, technologies, link, owner, selectedTechnologies } = state;
  const [updateProject,] = useUpdateProjectMutation();
  const [imagePreview, setImagePreview] = useState(null);

  const { data: project, isLoading } = useGetProjectQuery(id);

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const images = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          images.push(e.target.result);
          if (images.length === files.length) {
            dispatch({ type: "image", payload: [...image, ...images] });
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };
    
    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files) {
            const images = [];
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    images.push(e.target.result);
                    if (images.length === files.length) {
                        dispatch({ type: "image", payload: [...image, ...images] });
                    }
                };
                reader.readAsDataURL(files[i]);
            }
        }
    };


  const handleDeleteImage = (index) => {
    dispatch({ type: "deleteImage", payload: index });
  };

  const handleTechnologiesChange = (e) => {
    const selectedTech = Array.from(e.target.selectedOptions, (option) => option.value);
    dispatch({ type: "technologies", payload: selectedTech });
  };

  const handleAddTechnologies = (e) => {
    e.preventDefault();
    dispatch({ type: "addTechnologies", payload: selectedTechnologies });
  };

  const handleDeleteTechnologies = (e) => {
    e.preventDefault();
    dispatch({ type: "deleteTechnologies" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProject({ ...state, id }).unwrap();
      dispatch({ type: "clearForm" });
      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  const renderForm = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <section style={formStyle}>
        <form onSubmit={handleSubmit}>
          <label style={labelStyle} htmlFor="name">
            Name
          </label>
          <input style={inputStyle} type="text" name="name" value={name} onChange={handleChange} required />
          <label style={labelStyle} htmlFor="description">
            Description
          </label>
                <input style={inputStyle} type="text" name="description" value={description} onChange={handleChange} required />
                
                <label style={labelStyle} htmlFor="image">
                    Image
                </label>
                <div>
                    {project.image.map((image, index) => (
                        <div key={index} style={{ position: "relative" }}>
                            <img style={{
                                width: "20%",
                                height: "20%",
                                objectFit: "cover",
                            }}

                            src={image} alt="preview" />
                            <button
                                style={{
                                    position: "relative",
                                    top: "5px",
                                    right: "5px",
                                    backgroundColor: "red",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "25px",
                                    height: "25px",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleDeleteImage(index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                    
                    
                </div>

          {/* <div style={dropAreaStyle} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            {imagePreview ? (
              Array.isArray(imagePreview) ? (
                imagePreview.map((image, index) => (
                  <div key={index} style={{ position: "relative" }}>
                    <img style={imageStyle} src={image} alt="preview" />
                    <button
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))
              ) : (
                <img style={imageStyle} src={imagePreview} alt="preview" />
              )
            ) : (
              "Drag & Drop or Click max 10mo jpg/png/svg"
            )}
            <input type="file" name="image" onChange={handleImageChange} multiple />
          </div> */}

          <label style={labelStyle} htmlFor="technologies">
            Technologies
          </label>
          <input style={inputStyle} type="text" name="selectedTechnologies" value={technologies.join(", ")} readOnly />

          <select style={inputStyle} name="technologies" multiple value={selectedTechnologies} onChange={handleTechnologiesChange}>
            {technologyOptions.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>

          <button style={buttonStyle} onClick={handleAddTechnologies}>
            Add Technology
          </button>
          <button style={buttonStyle} onClick={handleDeleteTechnologies}>
            Clear Technologies
          </button>

          <label style={labelStyle} htmlFor="link">
            Link
          </label>
          <input style={inputStyle} type="text" name="link" value={link} onChange={handleChange} />
          {/* <label style={labelStyle} htmlFor="owner">
            Owner
          </label>
          <input style={inputStyle} type="text" name="owner" value={owner} onChange={handleChange} /> */}
          <button style={buttonStyle} type="submit">
            Update Project
          </button>
        </form>
      </section>
    );
  };
  return <>{renderForm()}</>;
};

export default EditForm;

const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "60%",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f9f9f9",
};

const inputStyle = {
  width: "100%",
  marginBottom: "15px",
  paddingBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "3px",
  fontSize: "16px",
};

const labelStyle = {
  display: "block",
  fontSize: "18px",
  fontWeight: "bold",
};

const buttonStyle = {
  width: "45%",
  padding: "10px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "3px",
  fontSize: "18px",
  cursor: "pointer",
};

const dropAreaStyle = {
  border: "2px dashed #ccc",
  borderRadius: "3px",
  width: "80%",
  padding: "25px",
  textAlign: "center",
  fontSize: "20px",
  margin: "0 auto",
};

const imageStyle = {
  width: "100%",
};