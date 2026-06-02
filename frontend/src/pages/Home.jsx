import React from 'react'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Services from '../components/Services/Services'
import Portfolio from '../components/Portfolio/Portfolio'
import Request from '../components/Request/Request'
import Reviews from '../components/Reviews/Reviews'
import Contact from '../components/Contact/Contact'
import Analytics from '../components/Analytics/Analytics'
import Resume from '../components/Resume/Resume'
import Achievements from '../components/Achievements/Achievements'


const Home = () => {
  return (
    <div style={{marginBottom: "30px", marginTop: "75px"}}>
      <Hero />
      <About />
      <Services />
      <Analytics />
      <Request />
      <Portfolio />
      <Resume />
      <Achievements />
      <Reviews />
      <Contact />
    </div>
  )
}

export default Home