import React, { useState } from 'react'
import "./cardPost2.css"
import { Avatar, Button, HStack, Stack, Text } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { Tooltip } from 'recharts'
import { useGlobalContext } from '../Store/GlobalContext' 


const CardSharePost2 = ({item}) => {
    console.log(item)
    const [Likes,setLikes] = useState(0)
    const [test,settest] = useState(false)
 const {TokenUser} =  useGlobalContext()

  return (
    <div className='repost--user'>
        
        <div className='repost-user-identify'>
        <Stack gap="8">
       
        <HStack key={1} gap="4">

            
          <Avatar   size="md" src={"https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:acm2yz57z6weqbdbw5lpluu3/bafkreihfmrmfrt3bfx2dhpms32u3hfpg67ffqpxegkdljxvehku4i5e7mi@jpeg"} />
          
 


          <Stack gap="0">
            <Text fontWeight="medium">{"Alex Spahn @spahn711.bsky.social 28d "}</Text>
            <Text color="fg.muted" textStyle="sm">
              {"Standing at 12,000 ft, near the summit of a volcano as it erupts (in my volcano hat and on next to no sleep)."}
            </Text>
          </Stack>
        </HStack>
 
  
       <div className='repost--user--sectionLine'>

          <div className='lineWeight'>
             <div className='iloveLine'></div>
              <div class="avtarLine">
             <Avatar  style={{zIndex:"3"}}  size="md" src={`${process.env.REACT_APP_API_KEY}/${TokenUser.imgUser}`} />
             </div>
 
          </div>

          <div className='imgdkfdkfkfd'>


            <div className='imgIndsidedivImg'>
            {item.post.imgItem.includes('/video/upload') ? (
    <video controls  style={{width:"100%",height:"100%",objectFit:"cover"}} >
      <source src={item.post.imgItem} type="video/mp4" />
       
    </video>
  ) : (
    <img src={item.post.imgItem} alt='' />
  )}
            
            </div>
       

       

                    <div className='reactDataImgPost'>
            <div className='busky--app-info-icons-1'  style={{cursor:"pointer"}}>
                    <img src='./commenter.png' alt='' />
                    <span>{0}</span>
                    </div>

                    <div className='busky--app-info-icons-1'  style={{cursor:"pointer"}}>
                    <img src='./arrow.png' alt='' />
                    <span>{0}</span>
                    </div>

                    <div className='busky--app-info-icons-1'  style={{cursor:"pointer"}}>
                    
                    {test ? <svg fill="none" width="18" viewBox="0 0 24 24" height="18" className="r-84gixx" style={{ color: "red" }} onClick={()=>{ settest((prev)=>!prev)
                        setLikes((prev)=>prev-1 )
                    }}>  
                            <path fill="#ec4899" fillRule="evenodd" clipRule="evenodd" d="M12.489 21.372c8.528-4.78 10.626-10.47 9.022-14.47-.779-1.941-2.414-3.333-4.342-3.763-1.697-.378-3.552.003-5.169 1.287-1.617-1.284-3.472-1.665-5.17-1.287-1.927.43-3.562 1.822-4.34 3.764-1.605 4 .493 9.69 9.021 14.47a1 1 0 0 0 .978 0Z"></path>
                        </svg>  :  <img src='./amour.png' alt=''  onClick={()=>{setLikes((prev)=>prev+1) 
                            settest((prev)=>!prev)
                        }}/>  }
                    <span>{Likes}</span>
                    </div>

                    <div className='busky--app-info-icons-1'  style={{cursor:"pointer"}}>
                    <img src='./plus.png' alt='' />
                   
                    </div>


            </div>
            
           <div class="dataUser">
           <div class="trainer-workout">
           <h2>nahdi.flex.socail <small>@nahdi.flex.socail 28 d</small></h2>
           </div>
           <div class="trainer-text">
            <h1>hhaha nice comment</h1>
           </div>

           <div className='reactDataImgPost'>
            <div className='busky--app-info-icons-1'  style={{cursor:"pointer"}}>
                    <img src='./commenter.png' alt='' />
                    <span>{0}</span>
                    </div>

                    <div className='busky--app-info-icons-1'  style={{cursor:"pointer"}}>
                    <img src='./arrow.png' alt='' />
                    <span>{0}</span>
                    </div>

                    <div className='busky--app-info-icons-1'  style={{cursor:"pointer"}}>
                    
                    {test ? <svg fill="none" width="18" viewBox="0 0 24 24" height="18" className="r-84gixx" style={{ color: "red" }} onClick={()=>{ settest((prev)=>!prev)
                        setLikes((prev)=>prev-1 )
                    }}>  
                            <path fill="#ec4899" fillRule="evenodd" clipRule="evenodd" d="M12.489 21.372c8.528-4.78 10.626-10.47 9.022-14.47-.779-1.941-2.414-3.333-4.342-3.763-1.697-.378-3.552.003-5.169 1.287-1.617-1.284-3.472-1.665-5.17-1.287-1.927.43-3.562 1.822-4.34 3.764-1.605 4 .493 9.69 9.021 14.47a1 1 0 0 0 .978 0Z"></path>
                        </svg>  :  <img src='./amour.png' alt=''  onClick={()=>{setLikes((prev)=>prev+1) 
                            settest((prev)=>!prev)
                        }}/>  }
                    <span>{Likes}</span>
                    </div>

                    <div className='busky--app-info-icons-1'  style={{cursor:"pointer"}}>
                    <img src='./plus.png' alt='' />
                   
                    </div>


            </div>

           </div>




          
          </div>
         
       </div>
     
    </Stack>
        </div>
    </div>
  )
}

export default CardSharePost2