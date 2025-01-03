import React from 'react'
import "./youtube.css"
import NavbarFlexYoutube from './NavbarFlexYoutube'
import RightSection from './RightSection'
import FlexVide from './FlexVide'
import "./LeftSection.css"
import MainSection from './MainSection'
const FlexYoutube = () => {
  return (
    <div style={{backgroundColor:"#0f0f0f"}}>
      <NavbarFlexYoutube/>

      <div className='mainContainer' > 
        <RightSection/>
        <MainSection/>
        
      </div>

    </div>

  )
}

export default FlexYoutube