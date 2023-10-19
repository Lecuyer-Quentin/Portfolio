import { useContext } from 'react'
import { dataContext } from '../../app/dataContext/DataContext'

import img1 from '../../assets/logos/mongodb.png';
import img2 from '../../assets/logos/node-logo.png';
import img3 from '../../assets/logos/react-logo.png';




const Hero = () => {
    const { hero } = useContext(dataContext);
    const { title, description } = hero
    const { src, alt } = hero.images[0]

    const logos = [img1, img3, img2]
    
    const logosWithId = logos.map(() => {
        return { id: Math.random() }
    })

    const renderLogos = () => {
        return logosWithId.map((logo, id) => {
            return (
                <div key={id}>
                    <img src={logos[id]} alt={logo.id} />
                </div>
            )
        }
        )
    }

    const renderDescription = () => {
        return description.map((text, index) => {
            return (
                <div key={index}>
                    {text}
                </div>
            )
        })
    }

    const renderHero = () => {
        return (
            <>
                <div className="hero__content">
                    <h1 className="hero__content__title">{title}</h1>
                    {renderDescription()}
                    <a href="https://storyset.com/web" target='_blank'>Illustrations by Storyset</a>
                </div>   
                <div className="hero__img">
                        <img src={src} alt={alt} />
                </div>
                <div className="hero__logos">
                        {renderLogos()}
                    </div>

            </>
        )
    }

    return (
        <>
            {renderHero()}
        </>
      
  )
}

export default Hero