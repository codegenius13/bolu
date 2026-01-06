import React from 'react'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Services from '../components/Services/Services'
import Portfolio from '../components/Portfolio/Portfolio'
import Request from '../components/Request/Request'
import Reviews from '../components/Reviews/Reviews'
import Contact from '../components/Contact/Contact'

const Home = () => {
  return (
    <div style={{marginBottom: "30px", marginTop: "75px"}}>
      <Hero />
      <About />
      <Services />
      <Request />
      <Portfolio />
      <Reviews />
      <Contact />
    </div>
  )
}

export default Home