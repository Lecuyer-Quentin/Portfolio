import { useContext, useState } from "react"
import { dataContext } from "../../app/dataContext/DataContext"
import FeatureItem from "./FeatureItem";

const Features = () => {
    const { features } = useContext(dataContext);
    const [currentFeature, setCurrentFeature] = useState(0);
    console.log(currentFeature)

    const handleNext = () => {
        setCurrentFeature((currentFeature + 1) % features.length);
    }
 
    const renderFeatures = () => {
        return features.map((feature, index) => {
            const isActive = index === currentFeature;
            return (
                <div key={index} className={`features__container__slide ${isActive ? "active" : ""}`} onClick={handleNext}>
                    <FeatureItem {...feature} />
                </div>
            )
        })
    }

    return (
        <>
            <h2 className="features__title">Mes compétences</h2>
            <div className="features__container">
                {renderFeatures()}
            </div>
        </>
           
    )

}

export default Features