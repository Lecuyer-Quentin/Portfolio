
const FeatureItem = ( feature ) => {
  const { title, description} = feature

  const renderImages = () => {
    return (
      <>
         {feature.images.map((image, index) => {
          return (
            <img key={index} src={image.src} alt={image.alt} />
          )
        }
        )}
      </>
       
    )
  }
  const renderWordsTitle = () => {
    return (
      <>
        {title.split(' ').map((words, index) => {

          return (
            <span key={index} className="words">
              {words.split('').map((letter, index) => {
                console.log(letter)
                return (
                  <span key={index} className="words__letter">
                    {letter}
                  </span>
                )
              })}
            </span>
          )
        }
        )}
      </>
    )
  }
  
  const renderFeatureItem = () => {
    return (
      <>
      <li>
        <div className="features__hexa__categories__flip-container" onTouchStart={() => this.classList.toggle('hover')}>
            <div className="features__hexa__categories__flip-container__flipper">
                <div className="features__hexa__categories__flip-container__flipper__front">
                    {renderImages()}
                
                  <p>{title}</p>
                
                </div>
                <div className="features__hexa__categories__flip-container__flipper__back">
                    <div className="features__hexa__categories__flip-container__flipper__back__flip-content">
                        <p>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </li>
        </>
    )
  }

  

  return (
    <>
      {renderFeatureItem()}
      
    </>
  )
}

 

export default FeatureItem
