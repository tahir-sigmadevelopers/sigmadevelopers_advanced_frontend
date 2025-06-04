import React from 'react'
import ProjectCard from '../ProjectCard'
import Testimonials from '../Testimonials'
import HeroSection from '../layout/HeroSection'
import ServicesCard from '../ServicesCard'
import IndustryExperince from '../IndustryExperince'
import Education from '../Education/Education'
import { useSelector } from 'react-redux'

const Home = () => {
  const { darkMode } = useSelector((state) => state.theme);
  
  return (
    <div className={darkMode ? "bg-gray-900" : "bg-white"}>
      <HeroSection />
      <Education />
      <ProjectCard />
      <ServicesCard />
      <IndustryExperince />
      <Testimonials />
    </div>
  )
}

export default Home