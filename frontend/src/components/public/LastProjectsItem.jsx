
import img3 from '../../assets/logos/react-logo.png';

const LastProjectsItem = ({project}) => {
    const { title, description, image } = project
    const imageTest = img3

    const renderItem = () => {
        return (
            <div className="last-projects__container__card">
                <img src={imageTest} className="last-projects__container__card__img" alt={title} />
                <div className="last-projects__container__card__body">
                    <h5 className="last-projects__container__card__body__title">{title}</h5>
                    <p className="last-projects__container__card__body__text">{description}</p>
                </div>
            </div>
        )
    }
        

    return (
        <>
            {renderItem()}
        </>
    
  )
}

export default LastProjectsItem