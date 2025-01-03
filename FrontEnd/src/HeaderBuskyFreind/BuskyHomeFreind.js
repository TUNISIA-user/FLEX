import React, { useEffect, useState } from 'react'
import "./BuskyHomeFreind.css"
import { Tabs, TabList, TabPanels, Tab, TabPanel, Divider, SkeletonCircle, SkeletonText, Box, WrapItem, Wrap, Button } from '@chakra-ui/react'
import Posts from './All__Card/Posts'
import InputSearch from './All__Card/InputSearch'
import CardChat from './All__Card/CardChat'
import axios from '../Component/axios'
import { useGlobalContext } from '../Store/GlobalContext'
import { useCallback } from 'react';
import _ from 'lodash'; 
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
const BuskyHomeFreind = () => {
  const [open,setopen] = useState(false)
  const [users,setUsers] = useState([])
  const [Loading,setLoading] = useState(false)
  const [loading2,setLoading2] = useState(false)
  const [user2,setUser2]= useState([])
  const [input,setinput] = useState([])
  const {TokenUser,currentUser,dispatch,Ram} = useGlobalContext()
  const [user3,setUser3] = useState([])
  const [lodaing3,setlodaing3] = useState(false)


  const Nav  =useNavigate()
 
    const UsersApi  = async()=>{
    
      const {data} = await axios.get("/get/allAuthor")
      const arr = data.filter((item)=>item._id!=TokenUser._id) 
      const reponse  = await axios.post(`/getAvoideRequest/${TokenUser._id}`)
      const result =    arr.filter((piece)=>TestIds(piece._id,reponse.data)==true) // why this return to me id should be reutne data ?
      console.log(result)
      setUsers(result)
      setLoading(false) 
      // console.log(arr)
      
    }
     

   



  useEffect(()=>{

    const intervalId = setInterval(() => {
      UsersApi()
  },2000);


  return () => clearInterval(intervalId);

  },[])








   
   const handleInputChange = useCallback(

    

    _.debounce(async (value) => {
      setLoading2(true)
      setinput(value);
      const { data } = await axios.get(`/get/accesUser?search=${value}`, {
        currentid: TokenUser?._id,
      });
      console.log(data);
      setUser2(data)
      // if(input==""){
      //   setUser2([])
      // }
      setLoading2(false) 
    }, 300),
    []
    
  );

  const HandelClick  = async()=>{
    //   const {data} =  await axios.get(`/get/accesUser?search=${input}`,{
    //     currentid : TokenUser?._id
    //   })
    // console.log(TokenUser?._id)
    // console.log(data)

  }
 

  const AcessAllMessagesTo_user = async ()=>{
    setlodaing3(true)
    try{
      const {data} = await axios.get(`get/access/specif/${TokenUser._id}`)
      console.log(data)
      setUser3(data)
      setlodaing3(false)

    }catch(eroor){
      console.log(`This reponse by ${eroor}`)
      //setlodaing3(false)
    }
  }

useEffect(()=>{
  AcessAllMessagesTo_user() // this solution when page reneder give me all data in section messages
},[])

 const HandelMyChatRoomFromTheServer = (item)=>{
  
 dispatch({
  type: "CURRENT__USER",
  paylod : item
})


 Nav('/bluskG/chat')
 }
// useEffect(()=>{
//   console.log(currentUser,TokenUser)

// })


const OfflineUser = async()=>{
  try{
    const UpdateUser  = await axios.post(`/update/offline/user/status/${TokenUser._id}`)

    console.log(UpdateUser,"close success")
  }catch(eroor){
    console.log(`this eroor by ${eroor}`)
  }
}



useEffect(()=>{
 OfflineUser()
  
},[])
const [opens,setOpens] = useState(false)

 useEffect(() => {
    
   const updateLastSeen = async () => {
     const now = new Date().toLocaleTimeString();
    
    
 
     try {
       const response = await axios.post(`/update/offline/user/lastseen/${TokenUser._id}`,
         {
           lastseen:now
         },
         {
           headers: {
             'Content-Type': 'application/json'
           }
         }
       );
  
       console.log('Last seen time updated successfully:', response.data);
     } catch (error) {
       console.error('Error updating last seen time:', error);
     }
   };
  
   
   updateLastSeen();
  
}, []);
const TestIds  =(id,arr)=>{
  let i  =0 
  while (i<arr.length && arr[i]!=id){
    i++
  }
  return i==arr.length

}
 
// const UpdataStatus  = async()=>{
//   try{
//     const {data}  = await axios.post(`/getAvoideRequest/${TokenUser._id}`)
   
  
//    const result =    users?.filter((piece)=>TestIds(piece._id,data)==true)
 
//  if(result){
//   dispatch({
//     type:"Ram",
//     payloadData :result
//   })

//  }
//  console.log(result)
 
//   }catch(eroor){
//     console.log(eroor)
//   }
// }
// useEffect(()=>{
//   UpdataStatus()
// },[])
 


//  useEffect(()=>{

//    const intervalId = setInterval(() => {
//      UpdataStatus()
//      console.log(Ram)
//  }, 600);


//  return () => clearInterval(intervalId);

//  },[])


  return (
<> 
 
    <div className='busky--home'>
          

          <div className='busky--home--container'>

            <div className={`busky--navbarx ${open?'openside':"closeside"}`}>   
            <div className={`busky--navar-seeting ${open?"openx":"closex"}`}>
           <div className='busky--navabar--img'><img src={`${TokenUser.imgUser}`} alt=''/></div>
         
           <div className='busky--container--section'>
           
            <Link to={"/bluskG"}>  <img src='../imgHome/accueil.png' alt=''/></Link>
            <span>Home</span>
           </div>
           

           
           

           
           

            

           <div className='busky--container--section'>
            <img src='../imgHome/symbole-hashtag.png' alt=''/>
            <span>Freind</span>
            
           </div>


           <div className='busky--container--section'>
            <img src='../imgHome/liste-a-puces (1).png' alt=''/>
            <span>Lists</span>
           </div>




           <div className='busky--container--section'>
            <img src='../imgHome/profil-de-lutilisateur.png' alt=''/>
            <span>Profile</span>
           </div>

           <div className='busky--container--section'>
            <img src='../imgHome/parametres-cog.png' alt=''/>
            <span>Setting</span>
           </div>
           
        
           


            </div>
            </div>
           
            <div className='busky--postsx'>
              <div className='screenSizex'>
                <p style={{color:"white"}}></p>
                {/* <img src='./ecdf797744ad4201be49b5d4e5582755-free.png' style={{width:"40px"}} alt=''/> */}
            {
             open ?   <img src='../imgHome/close.png'
              onClick={()=>setopen((prev)=>!prev)}
               className='menuSidebar' alt=''/>
             : (    <img src='../imgHome/menu.png'
              onClick={()=>setopen((prev)=>!prev)}
               className='menuSidebar' alt=''/>
            )
            }
            </div>
             <Tabs size='md'defaultIndex={1} >
                <TabList>
                    <Tab><h1 style={{color:"white",fontSize:"19px",fontWeight:"bold"}}>Users</h1></Tab>
                    <Tab onClick={()=>AcessAllMessagesTo_user()} ><h1 style={{color:"white",fontSize:"19px",fontWeight:"bold"}}>my Chat</h1></Tab>
                    <Tab><h1  style={{color:"white",fontSize:"19px",fontWeight:"bold"}}>Reels</h1></Tab>
                </TabList>
                

                <TabPanels >
                    <TabPanel className='Discoverx' >
                    
                    
                   {Loading? 
                   <>  
                     <Box padding='2' boxShadow='md' d="flex" bg='#161E2' style={{width:"400px"}}>
                     <SkeletonCircle size='70' />
                     <SkeletonText mt='9' noOfLines={4} spacing='5' skeletonHeight='4' />
                     </Box>
                     <Box padding='2' boxShadow='md' d="flex" bg='#161E2' style={{width:"400px"}}>
                     <SkeletonCircle size='70' />
                     <SkeletonText mt='9' noOfLines={4} spacing='5' skeletonHeight='4' />
                     </Box>       
                     <Box padding='2' boxShadow='md' d="flex" bg='#161E2' style={{width:"400px"}}>
                     <SkeletonCircle size='70' />
                     <SkeletonText mt='9' noOfLines={4} spacing='5' skeletonHeight='4' />
                     </Box>                     
                     <Box padding='2' boxShadow='md' d="flex" bg='#161E2' style={{width:"400px"}}>
                     <SkeletonCircle size='70' />
                     <SkeletonText mt='9' noOfLines={4} spacing='5' skeletonHeight='4' />
                     </Box>                     
                                                        
                     </>
                     
                       :
                       
                      users.length>0 ?  users?.map((item,index)=> <CardChat key={index}   item={item}/>   ) : <p style={{color    :"white"}}>no Freind yet  </p>  }
                    </TabPanel>
                    <TabPanel style={{color:'white'}} >
                    
                   
                    <div className='headersMessages'>  
                       <h1>Messages</h1>
                       {/* <Button colorScheme='blue' variant='solid'>
                          Button
                     </Button> */}
                    </div>
                     <div className='wrapUsersAccount'>
                     
                       { user3.length==0 ? <p>no freind now </p>  
                       : lodaing3 ?       <>  
                       <Box padding='2' boxShadow='md' d="flex" bg='#161E2' style={{width:"400px"}}>
                       <SkeletonCircle size='70' />
                       <SkeletonText mt='9' noOfLines={4} spacing='5' skeletonHeight='4' />
                       </Box>
                       <Box padding='2' boxShadow='md' d="flex" bg='#161E2' style={{width:"400px"}}>
                       <SkeletonCircle size='70' />
                       <SkeletonText mt='9' noOfLines={4} spacing='5' skeletonHeight='4' />
                       </Box>      
                                      
                                      
                                                        
                     </>:<>
                       

            { user3.length>0 ?      user3
             .slice() // Creates a shallow copy to avoid mutating the original array
             .reverse()
            .map((item,index)=>      <div className='card-wrapp--acount' style={{cursor:"pointer"}} onClick={()=>HandelMyChatRoomFromTheServer(item)}  key={index}>

<Avatar name='Ghaith Nahdi'  size='lg' src={`${item.imgUser}`} />
<div className='left--card-account'>
<h2 style={{display:"flex",width:"200px"}}>{item.username} | {item.ScoreRank} ⭐</h2>
{/* <p>@{item.email}</p> */}
<p className='messageme'>{item.LastSeen}</p>
</div>
</div>
)                 : <p>No Freind right now</p>             }

                     </>
                       
                        }

                  

                     </div>



                    </TabPanel>


                    <TabPanel className='Discover'>
                    <p style={{color:"white"}}>section videos reels :)</p>
                    </TabPanel>

                </TabPanels>



                </Tabs>

            </div>


            <div className='busky--search--useresx' >
            <span class="material-symbols-outlined" style={{cursor:"pointer",color:'white'}}
           onClick={()=>setOpens((prev)=>!prev)}
           > close </span>

           <div className='busky--search--clonex'style={{display:opens ? "block" :"none"}}  >
           <div style={{display:"flex",flexDirection:"row"}}><InputSearch onInputChange={handleInputChange}  onClickFunction= {HandelClick}/>
           </div>
           <br/><br/>
           <hr/>
          
           <div className='busky--usersèè' >
         
            {loading2 ?    <Box padding='6' boxShadow='lg' bg='#161E2'>
       <SkeletonCircle size='10' />
           <SkeletonText mt='2' noOfLines={2} spacing='5' skeletonHeight='17' />
           </Box>: <>
          { user2?.map((item)=>
            <div className='cards--busky-freind'>
            <Avatar name='Dan Abrahmov' src={`${item.imgUser}`} />
          <h2 style={{color:item.email==="devlopper@gmaill.s" || item.email=="nahdigyth@gmail.com" ? "gold":"white"} }>{item.email}</h2>
            <Button colorScheme='blue' className='add' >ADD</Button>
            </div>)}

 
           </>}



           </div>
        
 
           </div>


           
            </div>
          
          </div>
    </div>

    </>
    
  )
}

export default BuskyHomeFreind
