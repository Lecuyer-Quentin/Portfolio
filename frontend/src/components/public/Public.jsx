import Hero from './Hero'
import Features from './Features'
import Contact from './Contact'
import LastProjects from './LastProjects'
import { HeroDataProvider, FeaturesDataProvider, dataContext } from '../../app/dataContext/DataContext'
import ReactFullPage from '@fullpage/react-fullpage';
// import { Link } from 'react-router-dom'
// import { useContext } from 'react';

const Public = () => {
  // const { features } = useContext(dataContext)

   const renderAnchorLink = () => {
    return (
      <ul className='public__anchorLink'>
         <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#features">Features</a>
        </li>
        <li>
          <a href="#last-projects">Projects</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    )
  }

  const renderFullpage = () => {
    return (
      <ReactFullPage
        licenseKey='YOUR_KEY_HERE'
        scrollingSpeed={1000}
        navigation={true}
        navigationPosition={'left'}
        slidesNavigation={true}
        anchors={['home', 'features', 'last-projects', 'contact']}


        render={({ state, fullpageApi }) => {
          return (
            <ReactFullPage.Wrapper>

              <HeroDataProvider>
                <section className="section" data-anchor='home'>
                  <article className="hero">
                    <Hero />
                  </article>
                </section>
              </HeroDataProvider>

              <FeaturesDataProvider>
                <section className="section" data-anchor='features'>
                  <article className="features">
                    <Features />
                  </article>
                </section>
              </FeaturesDataProvider>

              <section className="section" data-anchor='last-projects'>
                <article className='last-projects'>
                  <LastProjects />
                </article>
              </section>

              <section className="section" data-anchor='contact'>
                <article className="contact">
                  <Contact />
                </article>
              </section>

            </ReactFullPage.Wrapper>
          );
        }}
      />
    );
  }
 
  return (
    <>
      {renderAnchorLink()}

      {renderFullpage()}
    </>

  )
}

export default Public