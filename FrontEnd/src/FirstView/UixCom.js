import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { color } from "framer-motion";
const UixCom = ({close}) => {
    const Nav = useNavigate()
    const Logout = ()=>{
        window.localStorage.clear()
        Nav("/")
      }

  return (
    <StyledWrapper style={{display:close?"block":"none"}}>
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

            <p className="uix-label">My Profile</p>
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
        <ul className="uix-list">
          <li className="uix-element">
          <Link to={"/bluskG"} state={{color:'none'}}><svg
  xmlns="http://www.w3.org/2000/svg"
  height="24"
  width="24"
  viewBox="0 0 24 24"
  fill="#1DA1F2"  // Twitter's blue color
>
  <path d="M24 4.557a9.805 9.805 0 0 1-2.828.775 4.935 4.935 0 0 0 2.165-2.724 9.863 9.863 0 0 1-3.127 1.195 4.922 4.922 0 0 0-8.39 4.482A13.978 13.978 0 0 1 1.671 3.149a4.923 4.923 0 0 0 1.523 6.573 4.903 4.903 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.946 4.89a4.93 4.93 0 0 1-2.224.084c.626 1.954 2.444 3.376 4.599 3.416A9.877 9.877 0 0 1 0 19.54a13.93 13.93 0 0 0 7.548 2.212c9.057 0 14.01-7.496 14.01-13.986 0-.213-.005-.426-.014-.637A9.965 9.965 0 0 0 24 4.557z"/>
</svg></Link>


            <p className="uix-label">
              <Link to={"/bluskG"} state={{color:'none'}}>Socail media </Link>
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

export default UixCom;
