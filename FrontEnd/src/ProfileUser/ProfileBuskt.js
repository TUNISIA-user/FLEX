 import React, { useEffect, useState } from 'react'
 import './NewProfileHome.css'
 import { Tabs, TabList, TabPanels, Tab, TabPanel, Editable, SkeletonCircle, SkeletonText, Box, HStack, Stack } from '@chakra-ui/react'
 import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
 import { useGlobalContext } from '../Store/GlobalContext'
 import axios from "../Component/axios"
import CardSharePost from './CardSharePost'
import { Text } from 'recharts'
import CardSharePost2 from './CardSharePost2'
 
 const ProfileBuskt = () => {
  const  {TokenUser ,userProfileSe} = useGlobalContext()
  const [LoadingPost,setPostLodingPost]  = useState(false)
  const [Likes,setLikes] = useState(0)
  const [test,settest] = useState(false)
 const [allData,setallData]= useState([])

 




 const RenderDataPrc = async()=>{
  try{
    const {data} = await axios.post(`/api/author/profile/${userProfileSe[0].userId}`)
    setallData(data)
 
  }
  catch(eroor){
    console.log(eroor)
  }
 }

 useEffect(()=>{
  RenderDataPrc()
 
 },[])

 // this sectio acess to get data from backend
const [retunPost,setReturnPost] = useState([])

  const callOfDuty =async ()=>{
    console.log(retunPost,"this data from this input value to value   ")
    setPostLodingPost(true)
    try{ 
                                                // should check this  TokenUser[0]._id;
                                                 // shiukd be passe it from useglobalt context 
      const {data} =  await axios.post(`/getMyposts/${TokenUser._id}`)
       console.log(data.specifPost)
      setReturnPost(data.specifPost)
      setPostLodingPost(false)
    }
    catch(eroor){
      setPostLodingPost(false)
      console.log(eroor)
      //
    }
  }
useEffect(()=>{
  callOfDuty()

},[])
 
 
   return (
     <div className='allCaontinserSearchProfileAbout'>
      <div className='search'>......  </div>
      <div className='Profilenb'>
        <div className='BackGroundPoctuer'>
          <img src="https://img.freepik.com/photos-gratuite/arriere-plan-flou-neon_23-2148132649.jpg" alt=''/>
        </div>

          <div className='UsERDinfo'>

            <div className='imgUserDinfo'>
              <Avatar size='lg'  src={`${allData.imgUser}`} className='slm'/>
              <h1 style={{color:"white",fontWeight:"bold"}}>{allData.username}.bsky.socail</h1>
              <h1 style={{color:"grey",fontWeight:"bold"}}>{allData.email}</h1>
              <h1 style={{color:"grey",fontWeight:"bold"}}>1 Follower 5 Following 9 posts</h1>
            
              </div>

            <div className='EdditProfileImg'>
            
              <span>Edit Profile</span>
              <span>...</span>
            </div>

          </div>
       
<Tabs>
  <TabList >
               
  <Tab><h1 style={{color:"grey",fontSize:"19px",fontWeight:"bold"}}>Posts</h1></Tab>
                    <Tab ><h1 style={{color:"grey",fontSize:"16px",fontWeight:"bold"}}>Replies</h1></Tab>
                    <Tab><h1  style={{color:"grey",fontSize:"16px",fontWeight:"bold"}}>Media</h1></Tab>
                    <Tab><h1  style={{color:"grey",fontSize:"16px",fontWeight:"bold"}}>Likes</h1></Tab>
                    

  </TabList>

  <TabPanels>
    <TabPanel className='sharePostsg'>
      


      {LoadingPost ?  <>
      
        <Box padding='10' boxShadow='lg' bg='#161E27' style={{width:"90%"}}>
  <SkeletonCircle size='10' />
  <SkeletonText mt='5' noOfLines={1} spacing='1' skeletonHeight='300'  />
 <div style={{display:"flex",justifyContent:"space-between",marginTop:"7px",borderRadius:"30px"}}>
 <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
 </div>
 <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
 </div>
 <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
 </div>
 
 </div>
</Box>
 


<Box padding='10' boxShadow='lg' bg='#161E27' style={{width:"90%"}}>
  <SkeletonCircle size='10' />
  <SkeletonText mt='5' noOfLines={1} spacing='1' skeletonHeight='300'  />
 <div style={{display:"flex",justifyContent:"space-between",marginTop:"7px",borderRadius:"30px"}}>
 <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
 </div>
 <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
 </div>
 <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
 </div>
 
 </div>
</Box>



<Box padding='10' boxShadow='lg' bg='#161E27' style={{width:"90%"}}>
  <SkeletonCircle size='10' />
  <SkeletonText mt='5' noOfLines={1} spacing='1' skeletonHeight='300'  />
 <div style={{display:"flex",justifyContent:"space-between",marginTop:"7px",borderRadius:"30px"}}>
 <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
 </div>
 <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
 </div>
 <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
 </div>
  

 </div>
</Box>

</>
       :  
       retunPost?.sort((a,b)=>new Date(b.post.createdAt)-new Date(a.post.createdAt))
      .filter((item)=>item.testeur=="Share")
       .map((ins)=><CardSharePost item={ins}/>)
      
       
     }
  
 
    </TabPanel>
    <TabPanel  style={{backgroundColor:"red"}} >
      <div className='ProfileContainerAppClone'>
 


 
     

      {
          LoadingPost? 
          <>
      
          <Box padding='10' boxShadow='lg' bg='#161E27' style={{width:"90%"}}>
    <SkeletonCircle size='10' />
    <SkeletonText mt='5' noOfLines={1} spacing='1' skeletonHeight='300'  />
   <div style={{display:"flex",justifyContent:"space-between",marginTop:"7px",borderRadius:"30px"}}>
   <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
   </div>
   <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
   </div>
   <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
   </div>
   
   </div>
  </Box>
   
  
  
  <Box padding='10' boxShadow='lg' bg='#161E27' style={{width:"90%"}}>
    <SkeletonCircle size='10' />
    <SkeletonText mt='5' noOfLines={1} spacing='1' skeletonHeight='300'  />
   <div style={{display:"flex",justifyContent:"space-between",marginTop:"7px",borderRadius:"30px"}}>
   <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
   </div>
   <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
   </div>
   <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
   </div>
   
   </div>
  </Box>
  
  
  
  <Box padding='10' boxShadow='lg' bg='#161E27' style={{width:"90%"}}>
    <SkeletonCircle size='10' />
    <SkeletonText mt='5' noOfLines={1} spacing='1' skeletonHeight='300'  />
   <div style={{display:"flex",justifyContent:"space-between",marginTop:"7px",borderRadius:"30px"}}>
   <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
   </div>
   <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
   </div>
   <div style={{width:"80px",borderRadius:"30px"}}>  <SkeletonText  noOfLines={1} skeletonHeight='7'  />
   </div>
    
  
   </div>
  </Box>
  
  </>
          :





          retunPost.sort((a,b)=>new Date(b.post.createdAt)-new Date(a.post.createdAt))
          .filter((ins)=>ins.testeur=="notShare")
          .map((ins)=><CardSharePost2 item={ins}/>)

          
      }
      </div>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
      </div>

      <div className='about'></div>
     </div> 
   )
 }
 
 export default ProfileBuskt



 