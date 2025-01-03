import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { useGlobalContext } from '../Store/GlobalContext';
import axios from './axios';
import Delte from '../FirstView/Delte';
const ProfilePage = () => {
  const [saves,setsaves] = useState([])
  const [filepAge ,setFilePage] = useState([])
  const {UserProfile,TokenUser} = useGlobalContext()
  const [view,setView]  =   useState(0)
  const user = {
    username: UserProfile[0].username,
    country: 'USA',
    bio: 'Software developer passionate about open-source projects and always learning new technologies!',
    score: 500,
    reputation: 1234,
    avatar: `${process.env.REACT_APP_API_KEY}/${UserProfile[0].imgUser}`,
    backGround : `myaccountGihutb.png`
  };
  console.log(UserProfile[0]._id,"dd")

  const Upload = async()=>{
    try{
     const {data} =  await axios.get(`/getProfile/${UserProfile[0]._id}`)
     console.log(data,"captuer")
     setsaves(data)
    }catch(eroor){
      console.log(`this eroor by ${eroor}`)
    }
  }
  useEffect(()=>{
    Upload()
  },[])

  const HandelChangeDataINeactPullRequest = (e)=>{
    console.log(e)
  }


  
  

  return (
    <div style={{backgroundColor:"#0D1117"}}>

    

    <div className="profile-container" >
        
        <div className='HandelImg'>
        <img src={user.backGround} alt=''/>
        </div>
        <hr/>
      <div className="profile-header">
        <img className="profile-avatar" src={user.avatar}  alt="" />
        <div className="profile-info">
          <h1 className="profile-username" style={{display:"flex",alignItems:"center",gap:"10px",color:"white"}}>{user.username} <span ><img src='quality.png' alt="" style={{width:"22px"}}/></span></h1>
          <p className="profile-country">Location: {user.country}</p>
          <p className="profile-bio">{user.bio}</p>


           <div className='rightSidey'> 

          <div className="profile-stats">
            <div className="profile-stat">
              <span className="stat-label">Score:</span> {user.score}
            </div>
            <div className="profile-stat">
              <span className="stat-label">Reputation:</span> {user.reputation}
            </div>
            <div className="profile-stat">
              <span className="stat-label">Following:</span> 11 M
            </div>
            
            <div className="profile-stat">
              <span className="stat-label">Flower:</span> 42k
            </div>
            </div>
            <br/>
            <div className='profileBadgce'>

            <div className="profile-stat1">
              <span className="stat-label">
               
                {saves.length>2  &&    <img src='star-medal.png' alt=''  /> }
                </span> 
            </div>
     
            <div className="profile-stat1">
              <span className="stat-label1">
                <img src='gold-medal (1).png' alt='' />
                </span> 
            </div>

            <div className="profile-stat1">
              <span className="stat-label1">
                <img src='gold-medal.png' alt='' />
                </span> 
            </div>
         
            <div className="profile-stat1">
              <span className="stat-label1">
                <img src='silver-medal copy.png' alt='' />
                </span> 
            </div>

            <div className="profile-stat1">
              <span className="stat-label1">
                <img src='medal.png' alt='' />
                </span> 
            </div>
             

            <div className="profile-stat1">
              <span className="stat-label1">
                <img src='medal (1).png' alt='' />
                </span> 
            </div>

            <div className="profile-stat1">
              <span className="stat-label1">
                <img src='silver-medal (1).png' alt='' />
                </span> 
            </div>


            </div>


          </div>
        </div>
      </div>
      <div className="profile-content">
        <h2 style={{color:"white",fontWeight:"bold"}}>Recent Activity</h2>
        {/* Add recent activity or other content here */}
        <div className='container-card-profile'>  
        {saves.length>0 ? saves.map((item)=>
        
         
       
         


         <div className="clone-card helper" onClick={()=>HandelChangeDataINeactPullRequest(item)}>
      <div className="clone-card-img" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <img
          src={`${process.env.REACT_APP_API_KEY}/${TokenUser.imgUser}`}
          style={{width:'50px',height:'50px',objectFit:"cover",borderRadius:"100%"}}
          alt=""
        />
        <small>
          <Delte/>
        </small>
      </div>
     
      <div className="clone-card-Description"   >{item.description}</div>

      <div className="clone-card-mention">
        <div className="mention1">#docker</div>
        <div className="mention1">#java</div>
      </div>

      <div className="clone-card-Time">Aug 16 . 3m Watch me</div>
      <div className="clone-card-img-container">
        <img

          
          src={item.imgItem}
          alt=""
        />
      </div>
      <div className="clone-card-Setting">

        <div className="clone-card-top-flop">
          <span className="Like"   >
            Views
      
          </span>
             

        
         </div>
     
      </div>
    </div>




         
          
      
      ) : <p>No recent activity to display.</p>}
      </div>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
