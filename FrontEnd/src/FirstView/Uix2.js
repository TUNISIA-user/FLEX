import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
 
const Uix2 = ({close}) => {
    const Nav = useNavigate()
    const Logout = ()=>{
        window.localStorage.clear()
        Nav("/")
      }
// make this nave make opacity
  return (
    <StyledWrapper  style={{display:close?"none":"block",position:"absolute",top:"30px",zIndex:4}}>
      <div className="uix-card">

        <ul className="uix-list">
          <li className="uix-element">
          <svg
  xmlns="http://www.w3.org/2000/svg"
  width="25"
  height="25"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#7e8590"
  strokeWidth={2}
  strokeLinecap="round"
  strokeLinejoin="round"
  className="lucide lucide-user"
>
  <circle cx="12" cy="7" r="4"></circle>
  <path d="M5.5 21a7.5 7.5 0 0 1 13 0"></path>
</svg>

       
            <Link to={"/flexProfile"} style={{textDecoration:"none",color:"white"}}>      <p className="uix-label">My Profile</p></Link>
          </li>
          <li className="uix-element">
            <svg
              className="lucide lucide-user-round-plus"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth={2}
              stroke="#7e8590"
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 21a8 8 0 0 1 13.292-6" />
              <circle r="5" cy="8" cx="10" />
              <path d="M19 16v6" />
              <path d="M22 19h-6" />
            </svg>
       
            <Link to={"/bluskG/freind"} style={{cursor:"pointer" ,color:"grey"}}>     <p className="uix-label">Add Member</p></Link>
          </li>
        </ul>


        <div className="uix-separator" />


        <ul className="uix-list"  > 
          <li className="uix-element" style={{display:"flex",flexDirection:"row"}} >
          <Link to={"/Headers"} state={{color:'none'}}>
          <svg
  xmlns="http://www.w3.org/2000/svg"
  width="25"
  height="25"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#7e8590"
  strokeWidth={2}
  strokeLinecap="round"
  strokeLinejoin="round"
  className="lucide lucide-help-circle"
>
  <circle cx="12" cy="12" r="10"></circle>
  <path d="M9.09 9a3 3 0 1 1 5.91 1c0 1.5-1 2-1.5 2.5s-.5 1-.5 2"></path>
  <line x1="12" y1="17" x2="12" y2="17"></line>
</svg>

          </Link>


            <p className="uix-label">
              <Link to={"/Admin/upload/page"} state={{color:'none'}}>You Can ask </Link>
            </p>
          </li>
        
        </ul>


        
        <div className="uix-separator" />
        <ul className="uix-list">
          <li className="uix-element">
          <svg
  xmlns="http://www.w3.org/2000/svg"
  width="25"
  height="25"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#7e8590"
  strokeWidth={2}
  strokeLinecap="round"
  strokeLinejoin="round"
  className="lucide lucide-log-out"
>
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
  <polyline points="16 17 21 12 16 7"></polyline>
  <line x1="21" y1="12" x2="9" y2="12"></line>
</svg>

            <p className="uix-label" style={{color:"red"}} onClick={()=>Logout()} >LOG OUT </p>
          </li>
        </ul>

        <ul className="uix-list">
          <li className="uix-element">
          <svg
  xmlns="http://www.w3.org/2000/svg"
  width="25"
  height="25"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#7e8590"
  strokeWidth={2}
  strokeLinecap="round"
  strokeLinejoin="round"
  className="lucide lucide-file-pdf"
>
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"></path>
  <path d="M14 2v6h6"></path>
  <path d="M9 12h1.5v6H9z"></path>
  <path d="M12 12h1.5v6H12z"></path>
  <path d="M15 12h1.5v6H15z"></path>
  <line x1="9" y1="17" x2="15" y2="17"></line>
</svg>


            <p className="uix-label" style={{color:"red"}} onClick={()=>Nav("/blsuky/pdf")} >PDF</p>
          </li>
        </ul>


        
      </div>






      
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .uix-card {
    width: 200px;
    background-color: rgba(36, 40, 50, 1);
    background-image: linear-gradient(
      139deg,
      rgba(36, 40, 50, 1) 0%,
      rgba(36, 40, 50, 1) 0%,
      rgba(37, 28, 40, 1) 100%
    );
    border-radius: 10px;
    padding: 15px 0px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .uix-separator {
    border-top: 1.5px solid #42434a;
  }

  .uix-list {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0px 10px;
  }

  .uix-element {
    display: flex;
    align-items: center;
    color: #7e8590;
    gap: 10px;
    transition: all 0.3s ease-out;
    padding: 4px 7px;
    border-radius: 6px;
    cursor: pointer;
  }

  .uix-element svg {
    width: 19px;
    height: 19px;
    transition: all 0.3s ease-out;
  }

  .uix-label {
    font-weight: 600;
  }

  .uix-element:hover {
    background-color: #5353ff;
    color: #ffffff;
    transform: translate(1px, -1px);
  }
  
  .uix-delete:hover {
    background-color: #ff4242;
  }
`;

export default Uix2;
