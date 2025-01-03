import React, { useEffect, useState } from 'react'
import './CardChat.css'
import { Button, ButtonGroup,Stack, useEditable } from '@chakra-ui/react'
import axios from "../../Component/axios"

import { useGlobalContext } from '../../Store/GlobalContext'
const CardChat = ({index,item}) => {
  const [wait,setwait] = useState(false)
  const {TokenUser,currentUser,dispatch} = useGlobalContext()

 
    const DataScooper = async(data)=>{
      
     setwait(true)
    console.log("send rquest to ",data._id ,"my current id ",TokenUser._id)
    
      
           try{
              await axios.post(`/accesMessage/${TokenUser._id}`,{
               userId : data._id
              })
              setwait(false)
            
           }catch(eroor){
             console.log(eroor)
             setwait(false)
           }
        
          

try{
const uix =  await axios.post(`/avoidRquest/${data._id }`,{
  mycurrentId :TokenUser._id

}
 
)
uix && alert("This is good 🎉🎉🎉")
}
catch(eroor){
  console.log(eroor)
}



    }
    
 
  return (

    <div className='CardChat--1' key={index}>
        <div className='CardChat--image'>
            <img src={`${item.imgUser}`} alt=''/>
        </div>
        <div className='CardChat--text'>{item.username}</div>
        <div className='CardChatButton'>

       <div className='cardBetween'>
       
  <Button 
  onClick={()=>DataScooper(item)}
  isLoading={wait}
  loadingText="sending Request"
  colorScheme='blue' variant='solid'>
    Add Freind
  </Button>
 
 

       </div>
        </div>
    </div>
  )
}

export default CardChat