import React from 'react'

const Option = ({word}) => {
  return (
    <div style={{background:"#272727",color:"#dbdbdb",maxWidth: "auto",display:"flex",justifyContent:"center",alignItems:"center",fontFamily:"cursive",fontSize:"14px",fontWeight:"bold",padding:"10px",borderRadius:"10px"}}>
       {word}
    </div>
  )
}

export default Option