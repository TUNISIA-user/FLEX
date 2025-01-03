import React, { useState } from 'react'
import CardF from './CardF'
import "./RightCard.css"
import Input4 from './Input4'

const RightCard = () => {
    const [isOpen,setIsopen] = useState(false)
    
  return (
    <div className='RightCard' style={{display:isOpen?"flex":"none"}}>
        <div className='CommentCard'>
            <div className='CommentCard'>Comments (161)</div>
            <div className='CommentCardX' onClick={()=>setIsopen(false)}>XXXX</div>
        </div>
        <div className='scrollCard'> 
        <CardF/>
        <CardF/>
        <CardF/>
        <CardF/>
        <CardF/>
       
        <CardF/>
        </div>
  <div className='ReplyCommentdd'>
    <Input4/>
  </div>
    </div>
  )
}

export default RightCard