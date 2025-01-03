import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./BlockUsers.css"
import axios from "../Component/axios"
import { useGlobalContext } from "../Store/GlobalContext";
const BlockUsers = ({myId,matchID,passFunction,test,testBlock,isOpen,asuss}) => {
  
    const {TokenUser} = useGlobalContext()
    // console.log(test[0],"oopfunction")
    // console.log(TokenUser?._id==test[0]?.id)
    // console.log("--------------------------------------")

    
     
   
      const HandelBlockUser =async()=>{

        passFunction(true)
        
        try{
           const blockuser  = await  axios.post(`/blockChat/${myId}`,{
            userId  :   matchID 
           })
       
           passFunction(false)
           setiss(false) // this voide for handel close button 
        }
        catch(eroor){
        console.log(eroor)
        passFunction(false)
   
       }

       try{
        const sendtheblock  = await  axios.post(`/addBlocker/${myId}`,{
            userId: matchID,
            blokcerAccount: {
              id:TokenUser._id ,
              nameBlocker: TokenUser.username,
              pictuerBlocker: TokenUser.imgUser
            }
          }
          
          
        
        )
     
       }
       catch(eroor){
        console.log(eroor)

       }


      }
     const HandelUnblockuser =async ()=>{
    passFunction(true)
    try{
       const blockuser  = await  axios.post(`/unblock/${myId}`,{
        userId  :   matchID
       })
   
       passFunction(false)
      
        
    }
    catch(eroor){
    console.log(eroor)
    passFunction(false)

   }
     }
    const deleteConversation  =async()=>{
        passFunction(true)
     try{
        const detlete  = await  axios.post(`/deleteConversation/${myId}`,{
            userId  :   matchID
        })
    
        passFunction(false)
     }
     catch(eroor){
     console.log(eroor)
     passFunction(false)

    }
}
const [iss,setiss] = useState(null)
const [parDeafut,setparDeafult] = useState(false)
  return (
    <StyledWrapper style={{display: isOpen ? "block":"none"}}>
      <div className="input"  style={{display:iss==false && "none"}}>
    { !testBlock &&     <button className="value" onClick={()=>HandelBlockUser()} >


        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-7.9 10c0-4.36 3.54-7.9 7.9-7.9 1.92 0 3.68.67 5.07 1.78L5.88 17.98A7.874 7.874 0 0 1 4.1 12Zm7.9 7.9c-1.92 0-3.68-.67-5.07-1.78L18.12 6.02A7.874 7.874 0 0 1 19.9 12c0 4.36-3.54 7.9-7.9 7.9Z"/>
     </svg>

      
          <h2 >    BLOCK  USER</h2>
       
        </button>
        
         }
             { TokenUser?._id==test[0]?.id  &&    <button className="value" onClick={()=>HandelUnblockuser()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" 
        stroke="currentColor" stroke-width="2"/>
  <path d="M3 21c0-3.87 3.13-7 7-7h4c3.87 0 7 3.13 7 7" 
        stroke="currentColor" stroke-width="2"/>
  <path d="M16 10v-2a2 2 0 1 1 4 0v2" 
        stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <rect x="16" y="12" width="6" height="6" rx="1" 
        stroke="currentColor" stroke-width="2"/>
  <path d="M18 14v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>

        
          <h2  onClick={()=>setiss(false)}>UNBLOCK USER</h2>
        </button> }

        <button className="value" onClick={()=>deleteConversation()} >
          <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#7D8590"
              d="m109.9 20.63a6.232 6.232 0 0 0 -8.588-.22l-57.463 51.843c-.012.011-.02.024-.031.035s-.023.017-.034.027l-4.721 4.722a1.749 1.749 0 0 0 0 2.475l.341.342-3.16 3.16a8 8 0 0 0 -1.424 1.967 11.382 11.382 0 0 0 -12.055 10.609c-.006.036-.011.074-.015.111a5.763 5.763 0 0 1 -4.928 5.41 1.75 1.75 0 0 0 -.844 3.14c4.844 3.619 9.4 4.915 13.338 4.915a17.14 17.14 0 0 0 11.738-4.545l.182-.167a11.354 11.354 0 0 0 3.348-8.081c0-.225-.02-.445-.032-.667a8.041 8.041 0 0 0 1.962-1.421l3.16-3.161.342.342a1.749 1.749 0 0 0 2.475 0l4.722-4.722c.011-.011.018-.025.029-.036s.023-.018.033-.029l51.844-57.46a6.236 6.236 0 0 0 -.219-8.589zm-70.1 81.311-.122.111c-.808.787-7.667 6.974-17.826 1.221a9.166 9.166 0 0 0 4.36-7.036 1.758 1.758 0 0 0 .036-.273 7.892 7.892 0 0 1 9.122-7.414c.017.005.031.014.048.019a1.717 1.717 0 0 0 .379.055 7.918 7.918 0 0 1 4 13.317zm5.239-10.131c-.093.093-.194.176-.293.26a11.459 11.459 0 0 0 -6.289-6.286c.084-.1.167-.2.261-.3l3.161-3.161 6.321 6.326zm7.214-4.057-9.479-9.479 2.247-2.247 9.479 9.479zm55.267-60.879-50.61 56.092-9.348-9.348 56.092-50.61a2.737 2.737 0 0 1 3.866 3.866z"
            />
          </svg>
          
          <h2  onClick={()=>setiss(false)}>Delete Chat</h2>
        </button>
        <button className="value">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path fill="currentColor" d="M16 2H8c-1.1 0-2 .9-2 2H4v2h1v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-2c0-1.1-.9-2-2-2Zm0 16H8V6h8v12ZM10 8h2v8h-2V8Zm4 0h2v8h-2V8Z"/>
</svg>
    
          <h2>Accessibility</h2>
        </button>

      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input {
  display: flex;
  flex-direction: column;
  width: 200px;
  background-color: #0D1117;
  justify-content: center;
  border-radius: 5px
}

.value {
  background-color: transparent;
  border: none;
  padding: 10px;
  color: white;
  display: flex;
  position: relative;
 
  gap: 5px;
  cursor: pointer;
  border-radius: 4px;
}

.value:not(:active):hover,
.value:focus {
  background-color: #21262C;
}

.value:focus,
.value:active {
  background-color: #1A1F24;
  outline: none;
}

.value::before {
  content: "";
  position: absolute;
  top: 5px;
  left: -10px;
  width: 5px;
  height: 80%;
  background-color: #2F81F7;
  border-radius: 5px;
  opacity: 0;
}

.value:focus::before,
.value:active::before {
  opacity: 1;
}

.value svg {
  width: 30px
}

.input:hover > :not(.value:hover) {
  transition: 300ms;
  filter: blur(1px);
  transform: scale(0.95,0.95);
}
`;

export default BlockUsers;
