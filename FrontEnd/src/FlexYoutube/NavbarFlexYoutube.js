import React from 'react'
import "./youtube.css"
import { useGlobalContext } from '../Store/GlobalContext'
import { Avatar } from '@chakra-ui/react'
const NavbarFlexYoutube = () => {
    const {TokenUser}= useGlobalContext()
  return (
    <div className='NavbarFlexYoutube'> 

    <div className='clone-logo'>
        <div className='logo-clone'><span class="material-symbols-outlined">menu</span></div>

        <div className='logo-Gif'><img src='../imgStartup/imgStartup.png' alt=''/></div>
    </div>

    <div className='clone-search'>
        <input type='text' placeholder='search ....'/>

        <div className='serach-flex'>
        <span class="material-symbols-outlined">search</span>
        </div>
    </div>

    <div className='clone-profileFlex'>
        <div className='clone-profile-uplod'><span class="material-symbols-outlined">upload</span></div>
        <div class="notifcation-clone-upload"><span class="material-symbols-outlined">notifications</span></div>
        <div class="clone-profile-avtarr">   <Avatar size='md'    src={`${process.env.REACT_APP_API_KEY}/${TokenUser.imgUser}`} /></div>
      
    </div>
    
    </div>
  )
}

export default NavbarFlexYoutube