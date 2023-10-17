import { useGetProjectQuery} from "../../app/api/projectsSlice"
import { useParams } from "react-router-dom"
import ProjectItem from "./ProjectItem"
import { InfinitySpin } from 'react-loader-spinner'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ProjectDetails = () => {

    const { id } = useParams()
    const { data: project, isLoading } = useGetProjectQuery(id)


    console.log('Recup project', project)

    if(isLoading) {
            return <InfinitySpin
                color='black'
                size={200}
                speed={1}
                visible={true}
                ariaLabel='three circles loading'
            />
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

    // const renderSlider = () => {
        
    //     if(project.images === undefined || project.images.length === 0 || isLoading) {
    //         return <InfinitySpin
    //             color='black'
    //             size={200}
    //             speed={1}
    //             visible={true}
    //             ariaLabel='three circles loading'
    //         />
    //     }
    //     return (
    //         <Slider {...settings}>
    //             {project.images.map((image, index) => (
    //                 <div key={index}>
    //                     <img src={image} alt={project.title} />
    //                 </div>
    //             ))}
    //         </Slider>
    //     )
            
    // }
    

    return (
        <>
            <h2>{project.title}</h2>
            {/* {renderSlider()} */}
        </>
    )
}


export default ProjectDetails


