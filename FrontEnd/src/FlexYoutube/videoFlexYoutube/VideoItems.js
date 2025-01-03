import React, { useRef,useEffect } from 'react'
import "./VideoItems.css"
import { Avatar } from '@chakra-ui/react'
const VideoItems = ({isopen}) => {
    const  videoRef = useRef()

 

 


  return (
    <div className='videoItems'>
    
    <div class="TopVideo">
        <video src='/j.mp4'
        onMouseEnter={()=> videoRef?.current?.play()}
        onMouseLeave={()=>  videoRef?.current?.pause()}
        ref={videoRef} 
        muted />

    </div>

    <div class="middleVideo">
        <div className='middleVideo-Avtar'>

        <Avatar
        name="Dan Abramov"
        src="https://bit.ly/dan-abramov"
        shape="square"
        size="md"
      />

        </div>
        <div className='middleVideo-Description'>Panama Canal: The Engineering Marvel That Changed the World 🇵🇦</div>
        <div className='middleVideo-Option'><span class="material-symbols-outlined">more_vert</span></div>
        
        
    </div>
 

    <div class="detailsVideos">
       <div class="detailsVideosProfilex">Ghaith Nahdi <span class="material-symbols-outlined">check_circle</span></div>
      
    </div>
    
    <div class="detailsVideo-viwes">48K views  5 days ago</div>
    </div>
  )
}

export default VideoItems