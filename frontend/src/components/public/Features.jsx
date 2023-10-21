import { useContext, useEffect, useState } from "react"
import { dataContext } from "../../app/dataContext/DataContext"
import FeatureItem from "./FeatureItem";

const Features = () => {
    const { features } = useContext(dataContext);
  
    const renderFeatures = () => {
        return features.map((feature, index) => {
            return (
                <FeatureItem key={index} {...feature} />
            )
        })
    }


    const renderFeatures2 = () => {
        return (
            <div id="hexagone" className="features__hexa">
                <ul id="categories" className="features__hexa__categories">
                    {features.map((feature, index) => {
                        return (
                            <FeatureItem key={index} {...feature} />
                            // <li key={index}>
                            //     <div className="features__hexa__categories__flip-container" onTouchStart={() => this.classList.toggle('hover')}>
                            //         <div className="features__hexa__categories__flip-container__flipper">
                            //             <div className="features__hexa__categories__flip-container__flipper__front" style={{ backgroundColor: '#000' }}>
                            //                 {feature.images.map((image, index) => {
                            //                     return (
                            //                         <img key={index} src={image.src} alt={image.alt} />
                            //                     )})
                            //                 }
                            //                 <p>{feature.title}</p>
                            //             </div>
                            //             <div className="features__hexa__categories__flip-container__flipper__back">
                            //                 <div className="features__hexa__categories__flip-container__flipper__back__flip-content">
                            //                     <p>
                            //                         {feature.description}
                            //                     </p>
                            //                 </div>
                            //             </div>
                            //         </div>
                            //     </div>
                            // </li>
                        )
                    }
                    )}
                </ul>
            </div>
        )
    }


      

    return (
        <>
            <h2 className="features__title">Tech</h2>
            {/* <div className="features__container" id="hexagons"> */}
                {/* <ul id="categories" className="features__container__categories"> */}
                    {renderFeatures2()}
                {/* </ul> */}
            {/* </div> */}
        </>
           
    )

}

export default Features