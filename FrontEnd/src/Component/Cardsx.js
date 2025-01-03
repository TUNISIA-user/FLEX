import "./Cardsx.css";
import { useGlobalContext } from "../Store/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "./axios";
import { Spinner } from "@chakra-ui/react";
export default function Cardsx({describre,imgicon,imgpofile,tags,document}) {
   const {dispatch,SavePost,TokenUser,AddQuestion} = useGlobalContext()
   const [view,setViews] = useState(0)


   const HandelGetView = async()=>{
    try{
      const {data} = await axios.get(`/viewLen/${document._id}`)
      setViews(data.length) 

    }catch(eroor){
      console.log(`This Eroor by ${eroor}`)
    }
   }
 



   useEffect(()=>{

    const intervalId = setInterval(() => {
      HandelGetView()
  
  }, 900);

  
})




   const Nav = useNavigate()
    const  HandelClickData = ()=>{

        dispatch({
          type:"ADD__QUESTION",
          payload2 : document
        })
       
         
       
         
    Nav("/HeadersTopQuestion")
     
      }

const [file,setfile] = useState([])
const HandelSaveButtonReactJS = async()=>{
   console.log(document.question,TokenUser._id,SavePost)
  //  dispatch({
  //   type: "SAVE__POST",
  //   paylodSave : document.question
  //  }) 
  try{
  const responseData =  await axios.post(`/pushMyBasket/${TokenUser._id}`,{
    
     id :TokenUser._id ,
     imgItem : document.question.imgItem ,
     text : document.question.text ,
     description :document.question.description 
},

 
)  
 if(responseData){
  (alert("succes data"))
 }  

  }catch(eroor){
    console.log(`this eroor by ${eroor}`)
    alert("this already ")
  }
  
}
useEffect(()=>{
  console.log(SavePost)
},[SavePost])

const [isLikeSucess,setisLikesSucess] = useState(false)
const [isDisLikeSucess,setisDisLikeSucess] = useState(false)


const HandelTopReactButton =async()=>{
 
  try{
      setisLikesSucess(true)
    const Views   = await axios.post(`/postVies/${document._id}`,{
      userIdJoin : TokenUser._id
    })
    // window.location.reload()
    setisLikesSucess(false)
  }
  catch(eror){
    console.log(`The Error by ${eror}`)
    setisLikesSucess(false)
  }

  
}


const HandelFlopReactButton  = async()=>{

  try{  
      setisDisLikeSucess(true)
    
     const Delte   = await axios.post(`/deltevi/${document._id}`,{
      userIdJoin : TokenUser._id
    })
    // window.location.reload()
    setisDisLikeSucess(false)
     
  }
  catch(eroor){
    console.log(`this eroor by ${eroor}`)
    setisDisLikeSucess(false)
  }
}

 
  return (
    <div className="clone-card helper">
      <div className="clone-card-img">
        <img
          src="./423cb91de98e4ee0b31e85d01936961a-free.png"
          style={{width:'50px',height:'50px',objectFit:"cover",borderRadius:"100%"}}
          alt=""
        />
      </div>
      <div className="clone-card-Description"  onClick={HandelClickData} >{document.question?.description}</div>

      <div className="clone-card-mention">
        <div className="mention1">#docker</div>
        <div className="mention1">#java</div>
      </div>

      <div className="clone-card-Time">Aug 16 . 3m Watch me</div>
      <div className="clone-card-img-container">
        <img

          
          src={document.question.imgItem}
          alt=""
        />
      </div>
      <div className="clone-card-Setting">

        <div className="clone-card-top-flop">
        
          {isLikeSucess ? <Spinner/> :  <span className="material-symbols-outlined details" onClick={HandelTopReactButton} >arrow_upward</span>}
          
           {view}
           {isDisLikeSucess ? <Spinner/> :  <span className="material-symbols-outlined details" onClick={HandelFlopReactButton}>arrow_downward</span>
}
         </div>
      <div className="icon-det">   
         <span className="material-symbols-outlined boxChat1 ">chat</span>
         <span className="material-symbols-outlined boxChatO " style={{cursor:"pointer"}} onClick={()=>HandelSaveButtonReactJS()}>bookmark</span>
         </div>
      </div>
    </div>
  );
}
