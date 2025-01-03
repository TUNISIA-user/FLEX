import React from 'react';
import './Eroor.css';

const Eroor = () => {
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh",gap:"30px",backgroundColor:"black",color:"white",padding:"3px"}}>
      <h1 style={{fontSize:"100px",fontWeight:"bold"}}>404</h1>
      <p style={{fontSize:"2.4rem",fontWeight:"bold"}}>Something happened wrong, we are working to fix this :)</p>
      <img
        src="https://www.svgrepo.com/show/13688/settings.svg"
        alt=""
        className="rotate"
        style={{ width: '200px', height: '200px' ,backgroundColor:"white",borderRadius:"100px"}}
      />
      
    </div>
  );
};

export default Eroor;
