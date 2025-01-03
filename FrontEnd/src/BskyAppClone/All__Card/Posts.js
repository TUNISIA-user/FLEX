import React, { useState, useEffect } from 'react';
import "./posts.css";
import { Avatar, AvatarGroup, WrapItem } from '@chakra-ui/react';
import axios from '../../Component/axios';
import { useGlobalContext } from '../../Store/GlobalContext';
import { Spinner } from '@chakra-ui/react';
import UixCom from '../../FirstView/UixCom';
import { useToast } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
 
const Posts = ({ item, updateMessage, passFunc ,pass2Func}) => {
  const [isLiked, setIsLiked] = useState(false); // Track like state
  const { TokenUser,dispatch } = useGlobalContext();
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const toast = useToast()
  const handleLike = async () => {
    setIsLoadingRequest(true);
    try {
      const response = await axios.post(`/setLikePost/${TokenUser._id}`, {
        PostId: item._id,
        userId: TokenUser._id,
        name: TokenUser.username,
        email: TokenUser.email,
        imgUser: TokenUser.imgUser
      });

      // If the like is successful, update the local state
      if (response) {
        setIsLiked(true); // Set like state to true
        pass2Func()
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    } finally {
      setIsLoadingRequest(false);
    }
    


    
  };

  const verifyLikeStatus = async () => {
    try {
      const { data } = await axios.post(`/verifyD/${item._id}`, {
        PostId: TokenUser._id
      });

      // Set isLiked based on the response from the server //
      if (data === 'true') {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } catch (error) {
     //
    }
  };

  useEffect(() => {
    verifyLikeStatus();
     
  }, [isLiked]);


 



 



  const HandelremoveLikeinDataBaseLikePost = async()=>{
    
    setIsLoadingRequest(true)
    try{
         const ReactNodeJs  =  await  axios.post(`/verifyIfyouHaveLikeOrNo/${item._id}`,{
          PostId  : TokenUser._id
         })
         setIsLoadingRequest(false)
         setIsLiked(false)
         ReactNodeJs &&  pass2Func()
    }catch(eroor){
      console.log(`This Eroor by ${eroor}`)
      setIsLoadingRequest(false)
    }
  }
  const [UpdateProfile,setUpdateProfile]  = useState(false)
  const [findMe,setFindMe] = useState(false)
  const [loadingG,setLoadingG] = useState(false)
    const HelpChange = async()=>{
      setUpdateProfile(true)
      try{ 
         const DataChechk  = await axios.post(`/testIfIexist/${item._id}`,{
          useridIdentfy :TokenUser?._id
         })
         DataChechk && setFindMe(true)
        
      }
      catch(eroor){
        console.log(eroor)
      }
    }
  const HandelDeltePostFromThisDataBase = async()=>{
    console.log(TokenUser?._id,item._id)
    setLoadingG(true)
       try{ 
       const DeleteOne = await axios.post(`/remove/post/${item._id}`,{
      
          useridIdentfy:TokenUser._id
       
       })
       toast({
        title: 'you post  remove it.',
        description: "We've remove it  your post",
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
      setLoadingG(false)
      setUpdateProfile(false)
     
    }catch(eroor){
      console.log(`this eroor by ${eroor}`)
      setLoadingG(false)
    }


  }

const [ShareLink,setShareLink] = useState("")

  const getLink  = async()=>{
    try{
        const {data}   =  await  axios.post(`/copyText/${item._id}`)
        setShareLink(data?.message)
       console.log(data.message)
       navigator.clipboard.writeText (data.message)
            if(data){
              toast({
                position: 'top',
                title: 'Success!',
                description: "🎉 Sucess copy !",
                status: 'success',
                duration: 900, // Toast will last for 5 seconds
                isClosable: false, // Adds a close button
                containerStyle: {
                  width: '800px',
                  maxWidth: '100%',
                },
              });
          
            }
      
    }catch(eroor){
      console.log(eroor)
    }   // navigator.clipboard.writeText (currentText);
  }


  
  const HandelSeeProfile = ()=>{
   
    dispatch({
      type : "SeeMyProfile",
      paylod : item
    })
  }
 
 

  const Handel__reposT_React = async()=>{
     console.log(item,"herewefo")
     try{
      const addToMyPost = await axios.post(`/postPost/profileY/${TokenUser._id}`,{
       userId:TokenUser._id,
       testeur:"notShare",
       myPersonnalIdea : "hhha slm nike",
       post:{
           text:item.post.text,
           like:0,
           share:0,
           imgItem:item.post.imgItem
   
       },
       onwerHasPictuer : TokenUser?.imgUser,
       ownerUserName : TokenUser?.username,
       email : TokenUser?.email,
       LikesPost :[],
       repostUser :[],
       Comment:[],
       email:TokenUser?.email,
       shareItFrom:[],
   })
   addToMyPost && alert("here we go from notShare ")
    
    }catch(eroor){
     console.log("thsi eroor by",eroor)
    }
  }
  return (
    
    <div className='busky--app-card-post'   >
      
      <div className='busky-app-avatar' >
        <WrapItem>
       
                 <Link to={"/flexProfile"}>     <Avatar
            size='md'
           
            src={`${item.onwerHasPictuer}`}
            onClick={()=>HandelSeeProfile()}
          /> </Link>

        </WrapItem>
  
      </div>

      <div className='busky-app-content'  >
        <div className='busky-app-info-user' style={{ display: "flex", alignItems: "center" }}>
          <h2 className='busky-username'>
            {item?.ownerUserName} 🩸 
            <h3 style={{ color: "grey",display:"flex",flexDirection:"column" }}>{item.email} 
              <p style={{color:"#505059"}}>{new Date(item.createdAt).toLocaleDateString()}</p>
            </h3>
          </h2>
          <div className='popelwannajoin' style={{ marginLeft: "5px" }}>
            <AvatarGroup size='md' max={3}>
              {item.LikesPost.map((like) => 
                like.id !== item.userId && (
                  <Avatar 
                    key={like.id}
                    name={like.name}
                    src={`${like.imgUser}`}
                  />
                )
              )}
            </AvatarGroup>
          </div>
        </div>

        <div className='busky-app-descibe-user thisgonnahelpme'  >
          <p className='psotCommentEtoile'  >{item.post?.text}<small style={{color:"#0056b3"}}> #0001</small></p>

        </div>

        <div className='busky-app-info-img'>

  {item.post.imgItem.includes('/video/upload') ? (
    <video controls  >
      <source src={item.post.imgItem} type="video/mp4" />
       
    </video>
  ) : (
    <img src={item.post.imgItem} alt='' />
  )}
</div>

{/* <div className='busky-app-info-icons'> */}
        <div className='busky-app-info-iconss'  style={{display:"flex",width:"90%",justifyContent:"space-between",margin:"13px"}}>
          <div className='busky--app-info-icons-1' style={{cursor:"pointer"}}>
            <img src='./commenter.png' alt='' onClick={() => updateMessage(true, item)} />
            <span>{item.Comment.length}</span>
          </div>

          <div className='busky--app-info-icons-1'  style={{cursor:"pointer"}}>
            <img src='./arrow.png' alt='' onClick={()=>Handel__reposT_React()} />
            <span>{item.post.share}</span>
          </div>

          <div className='busky--app-info-icons-1'  style={{cursor:"pointer"}}>
            {isLoadingRequest ? <Spinner /> : 
              isLiked ? (
                <svg fill="none" width="18" viewBox="0 0 24 24" height="18" className="r-84gixx" style={{ color: "red" }} onClick={()=>HandelremoveLikeinDataBaseLikePost()}>  
                  <path fill="#ec4899" fillRule="evenodd" clipRule="evenodd" d="M12.489 21.372c8.528-4.78 10.626-10.47 9.022-14.47-.779-1.941-2.414-3.333-4.342-3.763-1.697-.378-3.552.003-5.169 1.287-1.617-1.284-3.472-1.665-5.17-1.287-1.927.43-3.562 1.822-4.34 3.764-1.605 4 .493 9.69 9.021 14.47a1 1 0 0 0 .978 0Z"></path>
                </svg>
              ) : (
                <img src='./amour.png' alt='' onClick={()=>handleLike()}   style={{cursor:"pointer"}}/>
              )}
            <span>{item.LikesPost.length}</span>
          </div>

          <div className='busky--app-info-icons-1' >
           
            {!UpdateProfile ?   <img src='./plus.png' alt=''   style={{cursor:"pointer"}}  onClick={()=>HelpChange()}/> :
            
            <span class="material-symbols-outlined" onClick={()=>setUpdateProfile(false)}  style={{cursor:"pointer"}}> close</span>}
            <div style={{position:"absolute",left:'50%',top:'50%',cursor:"pointer",display:UpdateProfile?"block":"none"}} className='square'>
              
              <h2 style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"6px"}} onClick={()=>getLink()}>copy Link   <svg fill="none" viewBox="0 0 24 24" width="20" height="20"><path fill="hsl(211, 20%, 73.6%)" fill-rule="evenodd" clip-rule="evenodd" d="M8.17 4A3.001 3.001 0 0 1 11 2h2c1.306 0 2.418.835 2.83 2H17a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1.17ZM8 6H7a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V6Zm6 0V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1h4Z"></path></svg></h2>
              <h2 style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"6px"}}>Rapport <svg fill="none" viewBox="0 0 24 24" width="20" height="20"><path fill="hsl(211, 20%, 73.6%)" fill-rule="evenodd" clip-rule="evenodd" d="M11.14 4.494a.995.995 0 0 1 1.72 0l7.001 12.008a.996.996 0 0 1-.86 1.498H4.999a.996.996 0 0 1-.86-1.498L11.14 4.494Zm3.447-1.007c-1.155-1.983-4.019-1.983-5.174 0L2.41 15.494C1.247 17.491 2.686 20 4.998 20h14.004c2.312 0 3.751-2.509 2.587-4.506L14.587 3.487ZM13 9.019a1 1 0 1 0-2 0v2.994a1 1 0 1 0 2 0V9.02Zm-1 4.731a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z"></path></svg></h2>
              <h2 style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"6px"}}>Send direct<svg fill="none" viewBox="0 0 24 24" width="20" height="20"><path fill="hsl(211, 20%, 73.6%)" fill-rule="evenodd" clip-rule="evenodd" d="M3.374 3.22a1 1 0 0 1 1.073-.114l16 8a1 1 0 0 1 0 1.788l-16 8a1 1 0 0 1-1.417-1.136L4.97 12 3.03 4.243a1 1 0 0 1 .344-1.023ZM6.781 13l-1.284 5.133L17.764 12 5.497 5.867 6.781 11H9a1 1 0 1 1 0 2H6.78Z"></path></svg> </h2>
              <h2 style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"6px"}}>Update Profile <span class="material-symbols-outlined">update</span> </h2>
             
           
              
         
         
            {loadingG ? <Spinner
  thickness='4px'
  speed='0.15s'
  emptyColor='gray.200'
  color='blue.500'
  size='md'
/>               :
 findMe &&   <h2 style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"6px",color:"red"}} onClick={()=>HandelDeltePostFromThisDataBase()}>Delete <span class="material-symbols-outlined">delete</span> </h2> 
}
            </div>
          </div>
        </div>
      </div>
      
    </div>

  );
};

export default Posts;
