

const FeatureItem = (feature) => {

    return (
        <div style={cardStyle}>
            <div style={iconStyle}>
                {feature.images && feature.images.map((image, index) => {
                    return (
                        <img key={index} src={image.src} alt={image.alt} />
                    )
                })}
            </div>
            <div style={textStyle}>
                <h3 style={titleStyle}>{feature.title}</h3>     
                <p style={contentStyle}>{feature.content}</p>
            </div>
                
        </div>
    )
}

export default FeatureItem

const cardStyle = {
    width: '300px',
    height: '200px',
    backgroundColor: '#fff',
    border: '1px solid #eaeaea',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'transform 0.3s',
    cursor: 'pointer',
  };

  const iconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '24px',
  };

  const textStyle = {
    padding: '10px',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  };

  const contentStyle = {
    fontSize: '16px',
  };

  const hoverStyle = {
    transform: 'scale(1.05)',
  };

  const flipCardStyle = {
    transformStyle: 'preserve-3d',
    transition: 'transform 0.5s',
  };

  const flipCardFrontStyle = {
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
  };

  const flipCardBackStyle = {
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    transform: 'rotateY(180deg)',
  };