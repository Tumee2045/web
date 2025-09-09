import React from 'react'
import Hero from '../components/Hero'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Footer from '../components/Footer'
import Features from '../components/Features'
import CustomerReviews from '../components/CustomerReviews'
import LatestArrivals from '../components/LatestArrivals'
import FAQ from '../components/FAQ'

const Home = () => {
  return (
    <div>
      <Hero />
      <Features/>
      <BestSeller/>
      <CustomerReviews/>
      <LatestArrivals/>
      <OurPolicy/>
      <FAQ/>
    </div>
  )
}

export default Home

