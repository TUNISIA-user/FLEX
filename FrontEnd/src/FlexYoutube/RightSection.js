import React from 'react'
import  "./RightSection.css"
const RightSection = () => {
  return (
    <div className='app-right-side'>

   <div className='sideIcon'>
   <span class="material-symbols-outlined">home</span>
    <span>Accueil</span>
   </div>
   <div className='sideIcon'>
   <span class="material-symbols-outlined">video_library</span>
    <span>Shorts</span>
   </div>
   <div className='sideIcon'>
   <span class="material-symbols-outlined">subscriptions</span>
    <span>Abooenments</span>
   </div>

        <hr/>

        <div className='vous'>
            <h2>Vous</h2> <span class="material-symbols-outlined">arrow_forward_ios</span>
        </div>




        <div className='vous-play'>

            
   <div className='sideIcon'>
   <span class="material-symbols-outlined">home</span>
    <span>Historique</span>
   </div>
   <div className='sideIcon'>
   <span class="material-symbols-outlined">video_library</span>
    <span>PlayLists</span>
   </div>
   <div className='sideIcon'>
   <span class="material-symbols-outlined">subscriptions</span>
    <span>Your videos </span>
   </div>



   <div className='sideIcon'>
   <span class="material-symbols-outlined">subscriptions</span>
    <span>See Later</span>
   </div>
   

   <div className='sideIcon'>
   <span class="material-symbols-outlined">subscriptions</span>
    <span>Like videos</span>
   </div>


        </div>


 <hr/>
    </div>
  )
}

export default RightSection