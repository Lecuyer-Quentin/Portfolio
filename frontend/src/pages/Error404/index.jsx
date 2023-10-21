import React from 'react'
import { Link } from 'react-router-dom'
import errorImage from '../../assets/images/error404.png'

const Error404 = () => {
  return (
    <section className='error404'> 
      <div className='error404__container' style={{ '--stacks': 3 }}>
        <div className='error404__container__image'>
        <img src={errorImage} alt='error' />
      </div>
        <h1> Sorry,
          <div className='error404__container__stacks' style={{'--stacks': 3 }}>
            <span style={{'--index':0}}>404 Page not found</span>
            <span style={{'--index':1}}>404 Page not found</span>
            <span style={{ '--index': 2 }}>404 Page not found</span>
          </div>
        </h1>
      </div>

      <Link to='/' className='error404__link'>Go back to home</Link>
    </section>


  )
}

export default Error404