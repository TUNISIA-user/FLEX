import React, { useEffect, useState } from 'react'
import "./Body.css"
import Question from './Question'
import axios from './axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Cardsx from './Cardsx'
import HeadersQuestion from './HeadersQuestion'
import { useGlobalContext } from '../Store/GlobalContext'
const Body = () => {
  const {TokenUser} = useGlobalContext()
 
  const Nav = useNavigate()
  const [question,setQuestion]  = useState([])
  const HandelApi = async()=>{
    try{
      // const response = await axios.get("/getQuestion")
      // // console.log(response.data)
      // setQuestion(response.data.sort((a,b)=>b.view.length-a.view.length))
   setQuestion(null)
    }
    catch(index){
      //  
    }
  }
 
 
 
useEffect(()=>{
  HandelApi()
},[])


useEffect(()=>{

  const intervalId = setInterval(() => {
    HandelApi()

}, 4000);})


  return (
    <div className='Body__Container'>

         <div className='Body__Container__Inside'>
            
          <div className='Body__Container__Inside__Setting'>
            
          <div className='icon-left-side'>
  <button  style={{cursor:"pointer"}}>
    <Link to={"/RankPage"}>TOP SCORE</Link>
  </button>
<div className='icon-self'>

   
   <Link to={"/Headers"} style={{textDecoration:"none",color:"black"}}> <img src='home.png' alt=""/>  </Link>         
      <Link to={"/Headers"} style={{textDecoration:"none",color:"black"}}> <span>Home</span>    </Link>
 </div>


        {/* <div className='icon-self'>
           
      <Link to={"/HeadersTopQuestion"} style={{textDecoration:"none",color:"black"}}> <img src='message.png' alt=""/>  </Link>         
      <Link to={"/HeadersTopQuestion"} style={{textDecoration:"none",color:"black"}}> Questions  </Link>         

        </div>
     */}

        <div className='icon-self'>
        <img src='tag.png' alt=""/>
      <span>Tags</span>     
        </div>
    
        <div className='icon-self'>
        <img src='office-building.png' alt=""/>
      <span>Companies</span>     
        </div>
    
        <div className='icon-self'>
             
             <Link to={"/Users"}> <img src='group.png' alt=""/></Link>
           <span>Users</span>     
             </div>
         

                   
               </div>


          </div>
  
          <div className='Body__Container__Inside__Question'>

            <div className='TopQuestiob__Container'>
                <h2>Top Questions</h2>
                <button>Ask Question</button>
            </div>



            <div className='TopQuestiob__Intersetting'>
            <div className='INtestiongTab'>
                    <span>Interesting</span>
                    <span>Bounited</span>
                    <span>Hot</span>
                    <span>Week</span>
                    <span>Month</span>
                </div>
            </div>
            <br/>
            <hr/>
            <br/>
            <div className='Question__Section'> 
              
            {/* {question?.map((b)=>   <Question document ={b}/> )} */}
            {question?.map((b)=>   <Cardsx document ={b}/> )}
           
 
              </div>
           



       
          </div>
          



          
         </div>
         
    </div>
  )
}

export default Body