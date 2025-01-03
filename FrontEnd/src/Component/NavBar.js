import React, { useState } from 'react'
import "./NavBar.css"
import { useGlobalContext } from '../Store/GlobalContext'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import UIX from './UIX'
import { useNavigate } from 'react-router-dom'
import { color } from 'framer-motion'
const NavBar = () => {
  const {TokenUser} = useGlobalContext()
  console.log(TokenUser)
  const [open,setOpen] =useState(false)
  const Nav = useNavigate()
  return (
    <> 
    <div className='NavBar'>

      <div className='imgStackOverFlow' onClick={()=>Nav("/Headers")}><img src='./423cb91de98e4ee0b31e85d01936961a-free.png'
      
      /></div>

      <div className='imgSearch' >
           <input type='text' placeholder='Search for Something ....' alt='' />
      </div>

      <div className='user-icon-navbar'  style={{cursor:"pointer"}}>

    
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"}}>  
    <p style={{color:"white",fontWeight:"bold",fontSize:"17px"}}>Welcome</p> <h3 style={{color:TokenUser?.username==="admin" ||TokenUser?.username==="devlopper" ? "gold":"white"}}> {TokenUser.username} </h3>
      <Avatar
      size='md'
      src={ TokenUser?.imgUser? `${TokenUser.imgUser}`   :'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='}
      onClick={()=>setOpen((prev)=>!prev)}
      
    />
    </div>

    <div className='UIX'>
    <UIX close = {open} />
    </div>
   
 


      </div>

    </div>
    
     <hr/>

    </>
  )
}

export default NavBar