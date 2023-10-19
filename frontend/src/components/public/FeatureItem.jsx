
const FeatureItem = ( feature ) => {
  const { title, description} = feature

  const renderImages = () => {
    return (
      <div className="features__container__card__img">
        {feature.images.map((image, index) => {
          return (
            <img key={index} src={image.src} alt={image.alt} />
          )
        }
        )}
      </div>
    )
  }

  const renderFeatureItem = () => {
    return (
      <div className="features__container__card">
            {renderImages()}
        <div className="features__container__card__content">
          <h3 className="features__container__card__content__title">{title}</h3>
          <p className="features__container__card__content__description">{description}</p>
          <button className="features__container__card__content__button">Learn More</button>
        </div>
      </div>    
    )
  }

  

  return (
    <>
      {renderFeatureItem()}
      
    </>
  )
}

 

export default FeatureItem
