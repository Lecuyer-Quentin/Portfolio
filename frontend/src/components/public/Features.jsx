import { useContext } from "react"
import { dataContext } from "../../app/dataContext/DataContext"
import FeatureItem from "./FeatureItem";

const Features = () => {
    const { features } = useContext(dataContext);
    console.log('features', features)

    const renderFeatures = () => {
        return features.map((feature, index) => {
            return (
                <FeatureItem key={index} {...feature} />
            )
        })
    }

    return (
        <section style={featuresContainer} >
            <div className="features__content">
                <h2 className="features__title">Mes compétences</h2>
            </div>
            <div style={featuresItems}>
                {renderFeatures()}
            </div>
        </section>
    )

}

export default Features

const featuresContainer = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'space-evenly',
}
const featuresItems = {
    maxWidth: '50em',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: '0 auto',
    // overflow: 'hidden',

}