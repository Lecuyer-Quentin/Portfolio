import React from 'react'
import heroImage from '../../assets/images/heroImage4.jpg'


const Hero = () => {
  return (
      <>
          <div className='hero__image'>
              <img src={heroImage} alt="heroImage" />
          </div>
          <div className='hero__windows'></div>

            <div className='hero__text'>
                <h1 className='hero__text__title'>Good News Everyone! <br /> As a
                  <div className='hero__text__slider'>
                      <ul className='hero__text__slider__words'>
                            <li className='hero__text__slider__words__item'> Frontend Developer</li>
                            <li className='hero__text__slider__words__item'> Backend Developer</li>
                            <li className='hero__text__slider__words__item'> Human</li>  
                      </ul>
                  </div>
                  <br/> I
                  <div className='hero__text__slider'>
                        <ul className='hero__text__slider__words'>
                                <li className='hero__text__slider__words__item'> create </li>
                                <li className='hero__text__slider__words__item'> develop  </li>
                                <li className='hero__text__slider__words__item'> share</li>  
                      </ul>
                  </div>
                your
                  <div className='hero__text__slider'>
                        <ul className='hero__text__slider__words'>
                                <li className='hero__text__slider__words__item'> website</li>
                                <li className='hero__text__slider__words__item'> application</li>
                                <li className='hero__text__slider__words__item'> stories</li>  
                      </ul>
                  </div>
                </h1>
          </div>

          <div className='hero__fly'>
              <span className='hero__fly__item' >
                  Fullstack Developer
              </span>
                <span className='hero__fly__item' >
                  Design UX/UI
              </span>
              <span className='hero__fly__item' >
                    Web Development
              </span>
                <span className='hero__fly__item' >
                  Motion Picture
              </span>
                <span className='hero__fly__item' >
                  Agile
                </span>
          </div>
          
          
      </>
  )
}

export default Hero