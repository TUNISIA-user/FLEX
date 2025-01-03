import React ,{useState,useEffect}from 'react'
import "./FirstVIew.css"
import { useNavigate } from 'react-router-dom'
 

const   FIRSTVIEW = () => {
    const Nav = useNavigate()
 
   
  return (
    <> 
 
    

    <div className='container__first_view' style={{backgroundColor:"black",height:"100vh"}}>
        
        <div className="insdide__cotnainer">
          <div className='firstview__img' style={{border:"3px solid white",borderRadius:"100px",padding:"3px"}}><img src='./imgStartup/imgStartup.png'
          className='rotate--img--home'
          style={{width: "90px",height:"90px",borderRadius:"100px"}}/></div>
          <div className='firstview__titile'> 
            <h1 className='ASKENET' style={{color:"white"}}>FLEX</h1>
            <h4 className='whatsapp'  color='gold'>What's up?     </h4>
          </div>


          <div className='firstview__button'>

            <input type='button'  className='button1' value="Create a new account" onClick={()=> {Nav("/login")}} />

            <input type='button' style={{color:"#000"}} className='button2' value="Sign in"  onClick={()=>{Nav("/auth")}} />
           
          </div>          

        </div>  

        </div>
        </>

  )
}

export default FIRSTVIEW    