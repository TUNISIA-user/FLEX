import React from 'react'
import "./CardF.css"
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
const CardF = () => {
  return (
    <>  
    <div className='CardComment'>

         <div className='CardCommentAvtart'>   <Avatar size='md' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' /></div>
         <div className='rihgtSectionf'>
            <h2>evo_victor</h2>
            <p>why is it loading 😂</p>
            <div className='coantinerreply'>
                <h2>2d ago</h2>
                <div className='couer0'><span class="material-symbols-outlined">favorite</span></div>
                <div className='couerLikeN'>3033</div>
                <div className='reply'> <h2>Reply</h2></div>
            </div> 
            
            <details>
      <summary> ----View  42 replies</summary>
      <div className='CardCommentAvtart'>   <Avatar size='md' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' /></div>
         <div className='rihgtSectionf'>
            <h2>evo_victor</h2>
            <p>why is it loading 😂</p>
            <div className='coantinerreply'>
                <h2>2d ago</h2>
                <div className='couer0'><span class="material-symbols-outlined">favorite</span></div>
                <div className='couerLikeN'>3033</div>
                <div className='reply'> <h2>Reply</h2></div>
            </div> 
            </div> 
           <div className='CardCommentAvtart'>   <Avatar size='md' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' /></div>
         <div className='rihgtSectionf'>
            <h2>evo_victor</h2>
            <p>why is it loading 😂</p>
            <div className='coantinerreply'>
                <h2>2d ago</h2>
                <div className='couer0'><span class="material-symbols-outlined">favorite</span></div>
                <div className='couerLikeN'>3033</div>
                <div className='reply'> <h2>Reply</h2></div>
            </div> 
            </div> 
     
     </details>

         </div>
      
      
    </div>
    </>
  )
}

export default CardF