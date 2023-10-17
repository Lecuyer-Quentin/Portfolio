import { useContext } from 'react'
import { dataContext } from '../../app/dataContext/DataContext'

const Hero = () => {
    const { hero } = useContext(dataContext);
    const { title, description, images = [] } = hero
    const { src, alt } = images
    

    const renderHero = () => {
        return (
            <section className="hero">
                <div className="hero__content">
                    <h1 className="hero__title">{title}</h1>
                    <p className="hero__text">{description}</p>
                </div>
                <div className="hero__image">
                    <img src={src} alt={alt} />
                </div>
            </section>
        )
    }




    return (
        <>
            {renderHero()}
        </>
      
  )
}

export default Hero