import Hero from './Hero'
import Features from './Features'
import { HeroDataProvider, FeaturesDataProvider } from '../../app/dataContext/DataContext'

const Public = () => {
  
  return (
    <section>
      <div>
        <HeroDataProvider>
          <Hero />
        </HeroDataProvider>
      </div>
      
      <div>
        <FeaturesDataProvider>
          <Features />
        </FeaturesDataProvider>
      </div>
    </section>
    
  )
}

export default Public