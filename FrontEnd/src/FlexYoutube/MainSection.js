import React from 'react'
import "./LeftSection.css"
import Option from './Option'
import VideoItems from './videoFlexYoutube/VideoItems'
const MainSection = () => {

  return (
    <div className='MainSection'>
         
            <div class="choise">
                <Option word={"ALL"}/>
                <Option word={"Choufli hal"}/>
                <Option word={"Music"}/>
                <Option word={"Psyco m "}/>
                <Option word={"Computer programing"}/>
              
            </div>

            <div class="pubFlex">
            <video src="/pub.mp4" autoPlay loop muted>   </video>
            </div>
         <div class="videoClasses">

       <VideoItems  />
      
       <VideoItems  />
       <VideoItems  />
       <VideoItems  />
       <VideoItems  />
       <VideoItems  />
      
         </div>
         
    </div>
  )
}

export default MainSection