import React from 'react'
import "./Question.css"
import { useGlobalContext } from '../Store/GlobalContext'
import { useNavigate } from 'react-router-dom'

const Question = ({document}) => {
  const {dispatch} = useGlobalContext()
  const Nav = useNavigate()
  const  HandelClickData = ()=>{
    dispatch({
      type:"ADD__QUESTION",
      payload2 : document
    })
   
    Nav("/HeadersTopQuestion")

  }
  return (
    <div className='Question'>
        
        <div className='Votes'>
            <span> 0 Votes</span>
            <span>0 answers</span>
            <span>2 viex</span>
        
        </div>
        <div className='QuestionInside'>

            <div className='Reall__Question'   onClick={HandelClickData}>{document.question.description}</div>
            <div className='Reall__Question__Tag'>
                <h2>FireBase</h2>
                <h2>FireBase-Tools</h2>
            </div>
            <hr/>   
         </div>
        
    </div>
  )
}

export default Question