import React, { useRef, useState,useEffect } from 'react'
import "./BuskyHome.css"
import {Text as ChakraText, Tabs, TabList, TabPanels, Tab, TabPanel, Divider, Box, Avatar, CircularProgress, EnvironmentProvider, useEventListener, Hide, Spinner, AlertTitle, useFocusEffect, CircularProgressLabel } from '@chakra-ui/react'
import Posts from '../All__Card/Posts'
import InputSearch from '../All__Card/InputSearch'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { Link, RouterProvider } from 'react-router-dom'
import axios from "../../Component/axios"
import { useGlobalContext } from '../../Store/GlobalContext'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { AvatarBadge, AvatarGroup, WrapItem } from '@chakra-ui/react'
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS
import Input from '../../FirstView/Input'
import UIX from '../../Component/UIX'
import Uix2 from '../../FirstView/Uix2'
import Reels from '../../ReelsSection/Reels'
import RightCard from '../../ReelsSection/RightCard/RightCard'
import { io } from 'socket.io-client';
import FlexSiri from '../../aiModels/FlexSiri'
import SiriWave from "react-siriwave";

const socket = io('https://flex-social-social-app.onrender.com')



const BuskyHome = () => {
  var scroll = require("window-scroll");
  const [open,setopen] = useState(true)
  const [loading,setLoading] = useState(false)
  const [textAra,setTextArea]= useState("")
  const textareaRef = useRef(null);
  const [k,setk] = useState(300)
  const [post,setPost] = useState(false)
  const {TokenUser,dispatch,SiriVoice} = useGlobalContext()
  const toast = useToast()
  const [dataFromPostComeent,setdataFromPostComeent] = useState("")
  const [helpInput,setHelpInput] = useState([])
  const [cardopen,setcardopen] = useState(false)
  const [tompData,setTompaerData]  = useState([])
  const [loading1,setLoading1] = useState(false)
  const [killme,setkillme] = useState(false)
  const [notFiactionb,setnotifactiouy] = useState([])
  const [helpFunctioE,sethelpFunctioE] = useState(false)
  const [postLoading,setPostLoadingFire] = useState(false)
  const [progressPost,setProgress] = useState(30)
  const funca  = useRef(null)
  // console.log(`

 

  //   ███████╗██╗     ███████╗██╗  ██╗
  //   ██╔════╝██║     ██╔════╝██║ ██╔╝
  //   █████╗  ██║     █████╗  █████╔╝ 
  //   ██╔══╝  ██║     ██╔══╝  ██╔═██╗ 
  //   ██     ███████╗███████╗██║  ██╗
           
    
     
    
  //       `)


 
// const TesttIfWeFreindOrno = async (id1, id2) => {
//   try {
//     const checkFreind = await axios.post(`/check/users/freind/${id1}`, {
//       userId: id2
//     });

//     // Return the response data to be handled in useEffect
//     return checkFreind.data; // Assuming 'checkFreind.data' contains 'yes' or 'no'
//   } catch (error) {
//     console.log(error);
//     return null; // Return null in case of an error
//   }
// }


 


//   useEffect(() => {
//     socket.on("PrvMessages", async (data) => {
//       console.log(data);  // Logs the incoming data from the socket
  
//       // Await the result of TesttIfWeFreindOrno
//       const result = await TesttIfWeFreindOrno(data.room.users[0], data.room.users[1]);
  
//       console.log("Friend status:", result);
  
//       // You can now use the result (true or false) to do further logic
//       if (result === "yes") {
//         // Handle if they are friends
//         console.log("You are friends, display the message!");
//       } else {
//         // Handle if they are not friends
//         console.log("You are not friends.");
//       }
//     });
  
//     // Cleanup when component unmounts
//     return () => {
//       socket.off("PrvMessages");
//     };
//   }, []);
  






// useEffect(() => {
//   const fetchFriendStatus = async () => {
//     try {
//       const df = await CheckFreind("67179bf458a86999ecd0601f");
//       console.log(df, "func");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   fetchFriendStatus(); // Call the async function inside `useEffect`
// }, []);



// const CheckFreind  = async(checkUser)=>{
//   try{
 
//       const reponse  = await axios.post(`/check/users/freind/${TokenUser._id}`,{
//         userId  :   checkUser
//       })
      
//       return reponse.data
//   }catch(eroor){
//     console.log(eroor)
//   }

// }

const [mess,setmess] = useState(1)
const nameFriend  = async(id)=>{
  let name = ""
  try{
     const {data}  =  await axios.post(`/request/${id}`)  // 
      name  = data
     
  }catch(eroor){
    console.log(eroor)
  }
  return name  
}




useEffect(() => {
  socket.on("PrvMessages", async (data) => {
    console.log(data.room);
    
    console.log(data.room.messages[(data.room.messages.length)-1].content)
    
   // console.log(nameFriend(data.room.messages[(data.room.messages.length)-1].senderId))
    
    // do try and awiit  function here  
    // can i call function here ?   
   
     const funct = async()=>{
         try {
          const res = await nameFriend(data.room.messages[(data.room.messages.length)-1].senderId)
          
          const   reponse  = await axios.post(`/check/users/freind/${TokenUser._id}`,{
            userId  :  TokenUser._id== data.room.users[0]? data.room.users[1] :  data.room.users[0]
          })


           console.log(reponse.data)  
           




           if(reponse.data){
            setmess((prev)=>prev+1)
            toast({
           
              description: data.room.messages[data.room.messages.length - 1].content,
              duration: 3000,
              isClosable: true,
              position: "top",
              
              render: () => (
                <div style={{ background: "black", color: "white", padding: "16px", borderRadius: "8px" }}>

                   
                    

                  <div class="dataMessage0" style={{display:"flex",alignItems:"center",fontWeight:"bold",fontSize:"16px",fontFamily:"monospace"}}>

                    <div class="iconFlex1"> <Avatar   src={`${process.env.REACT_APP_API_KEY}/${data.room.messages[(data.room.messages.length)-1].imgProfile   }`}  size="sm"  mr={3}  /></div>
                   
                    <div class="dataUser1">
                        
                      <div class="class11"><h2>{res}  <em style={{fontWeight:"bold"}}>{new Date(data.room.messages[(data.room.messages.length)-1].timestamp).toLocaleTimeString('en-US')}</em></h2></div>
                      <div class="class22">{TokenUser.username.substr(0,Math.floor(TokenUser.username.length)/2)} ,you have {mess} new messages in a chat </div>
                    </div>

                  </div>

                </div>
              ),
            });
            
           }
          
         }catch(eroor){
          console.log(eroor)
         }
     }



     funct()
  });






  // Cleanup when component unmounts
  return () => {
    socket.off("PrvMessages");
  };
}, [socket, TokenUser, nameFriend, axios, setmess, toast, mess]);





  const [voidReels,setvoidReels]  = useState([])
  const callData = async()=>{
    try{
      const {data} = await axios.get("/api/video/get/websocket")
      
      setvoidReels(data)
  
    }catch(eroor){
      console.log(eroor)
    }
  }

 


  // useEffect(() => {
  
  //   const intervalId = setInterval(() => {
   
  //     callData()
  //     console.log(voidReels)
  //   },3000);

    
  //   return () => clearInterval(intervalId);
  // }, []);



  useEffect(() => {
 
      callData()
   

     
  }, []);








  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);


const func  = (item)=>{
  setcardopen((prev)=>!prev)
 
  setTompaerData(item) // this for get data the next  step now put this data inside input 
}

 


  function OnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
  
    const checkOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };
  
    useEffect(() => {
      // Check the online status when the component mounts
      checkOnlineStatus();
  
      // Add event listeners to track online/offline status
      window.addEventListener('online', checkOnlineStatus);
      window.addEventListener('offline', checkOnlineStatus);
  
      // Clean up event listeners on component unmount
      return () => {
        window.removeEventListener('online', checkOnlineStatus);
        window.removeEventListener('offline', checkOnlineStatus);
      };
    }, []);}





















useEffect(() => {
    if (textAra.length > 300) {
        console.log("tou7tch akther men 300 7arf brp");
        window.location.reload()
    }
}, [textAra]);

const handleInput = () => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset the height
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on content

        // Check if the height exceeds 300px
        if (textareaRef.current.scrollHeight > 300) {
            textareaRef.current.style.overflowY = 'auto'; // Enable vertical scrolling
            textareaRef.current.style.height = '300px'; // Limit the height to 300px
        } else {
            textareaRef.current.style.overflowY = 'hidden'; // No scrolling needed
        }
    }
};

useEffect(() => {
    handleInput(); // Set initial height based on content when the component mounts
}, []);





const commentRef = useRef(null);


// useEffect(() => {
//   const handleResize = () => {
//     if (commentRef.current) {
//       commentRef.current.style.height = '500'; // Reset height
//       commentRef.current.style.height = `${commentRef.current.scrollHeight}px`; // Set to the scroll height
//     }
//   };

//   handleResize(); // Call it once to set the initial height
//   window.addEventListener('resize', handleResize); // Adjust height on window resize

//   return () => {
//     window.removeEventListener('resize', handleResize);
//   };
// }, []);


const [fileName, setFileName] = useState('');
const [image,setImage] = useState('')
const [loaddingimg,setloaddingimg] = useState(false)

 
const handleFileChange = async (e) => {
  setloaddingimg(true);
  const file = e.target.files[0]; // Get the selected file
  
  if (!file) return; // Ensure a file is selected

  // Check if it's an image or video
  const fileType = file.type.split('/')[0]; // 'image', 'video', etc.
  
  if (fileType !== 'image' && fileType !== 'video') {
    //alert("Please select a valid image or video file.");
    setloaddingimg(false);
    return;
  }
  
  setFileName(file.name); // Update the fileName state

  const formData = new FormData();
  formData.append("file", file); // Append file to form data
  formData.append("upload_preset", 'ask-app'); // Your Cloudinary upload preset
  
  try {
    console.log("Uploading...");
    // Upload the file (image or video) to Cloudinary
    const uploadResponse = await axios.post(
      'https://api.cloudinary.com/v1_1/dfmdgsiid/upload', // Cloudinary upload URL
      formData
    );
    console.log(uploadResponse); 

    const mediaUrl = uploadResponse.data.secure_url;
    setImage(mediaUrl); // Set the uploaded file URL (image/video)
    setloaddingimg(false);
  } catch (error) {
    console.log(`This error is caused by: ${error}`);
    setloaddingimg(false); // Stop loading even in case of error
  }
};



const res = image && image
// console.log(res,"current img to server")



const HandelPushPost =async ()=>{



  if(textareaRef.current.value=="" 
    
  ){
    toast({
      title: 'Your ! Post  created.',
      description: "We've can  create your post should type something :).",
      status: "warning",
      duration: 2000,
      isClosable: true,
    })
  }
  setPostLoadingFire(true)
  setProgress(10)
 
 try{


  setProgress(40)
  setProgress(50)
   const PushData = await axios.post(`/post-posts/${TokenUser._id}`,
    {
      post: {
           text :   textareaRef.current.value,
           like : 0,
           share : 0,
           imgItem :image,
      },
       view : [],
       vote :0 ,
       onwerHasPictuer : TokenUser?.imgUser,
       ownerUserName : TokenUser?.username,
       email : TokenUser?.email,
       LikesPost :[],
       repostUser :[]
  }
    
   )
   setProgress(100)
   if(PushData){
    toast({
      title: 'Your post created.',
      description: "We've created your Post ",
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
    FuncX()
    setTextArea("")
    setImage("")
    setPost(false)
    sethelpFunctioE((prev)=>!prev)
    
    setPostLoadingFire(false)
   }
   else{
    toast({
      title: 'Your ! Post not   created.',
      description: "We've can  create your post :).",
      status: "warning",
      duration: 2000,
      isClosable: true,
    })
    setProgress(0)
    setPostLoadingFire(false)
   }
 }
 catch(eroor){
  console.log(eroor)
  setProgress(0)
  setPostLoadingFire(false)
 }
 






}









 const FuncX  = async()=>{

  try{
    const addToMyPost = await axios.post(`/postPost/profileY/${TokenUser._id}`,{
     userId:TokenUser._id,    // fix this part fo sahre ing with speople i htink all thing the same value for thsi peoml e
     testeur:"Share",
     post:{
         text: textareaRef?.current?.value,
         like:0,
         share:0,
         imgItem:image
 
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
 addToMyPost ?alert("here we go ") :alert("not yet")
  
  }catch(eroor){
   console.log("thsi eroor by",eroor)
  }
 
 }


const [fetchPostsFromDataBase,setfetchPostsFromDataBase] = useState([])
const [i,seti] = useState(false)

const CoffeeTime = async()=>{
  seti(true)
  try{
    const {data}   =  await axios.get('/post-comment/fetch')
     
 
    const sortedData = data.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
   
    setfetchPostsFromDataBase(sortedData)
    seti(false)



   
  }

  catch(eroor){
    console.log(eroor)
    seti(true)
  }


  
}



 
useEffect(()=>{
  CoffeeTime()
    
},[])

 

const RenderWithNoLoading  = async()=>{

  try{
    const {data}   =  await axios.get('/post-comment/fetch')
     
      
    const sortedDataRneder = data.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
     setfetchPostsFromDataBase(sortedDataRneder)
   
  }

  catch(eroor){
    console.log(eroor)
     
  }
}







 






 
 useEffect(()=>{
  RenderWithNoLoading()
 },[helpFunctioE])

 


 

 




const [CommentPost,setCommentPost] = useState(false)
const [variable,setVaribale] = useState("")
const[imghyf,setimghyf] = useState("")
const [textf,settextf] =useState("")
const [creatTime,setCeateTime] =useState("")
//section comment for the users
const [userid7oula,setuserid7oula] = useState("")
const updatePost= async(newMessage,item) => {
  setCommentPost(newMessage);
  
  setVaribale(item._id)
  dispatch({
    type: "CommentSection",
    paylod : item
  })
   
  setimghyf(item.post.imgItem)
  settextf(item.post.text)
  setCeateTime(item.post.createdAt)
  setuserid7oula(item.userId)

};
 
 

 
useEffect(()=>{
  getAutoherCommentSpecif()
},[CommentPost==true])


const   [reallComment,setReallComment]  = useState([])

const PostCommentA = async()=>{

  setLoading1(true)
  try{
   
    const Dta = await axios.post(`/post-comment/${variable}`,{
      
        currentUserId:TokenUser._id,  // Replace with a valid user ObjectId
        comment: funca.current.value,
        imgComment:"exmple try to post img",  // Optional image URL
        UsernameComment: TokenUser.username,
        ProfileImg: TokenUser.imgUser  // Optional profile image URL
    
    })
    if(Dta){
     

      toast({
        title: 'Your ! Comment  Posted.',
        description: "We've can  create your Comment :).",
        status: "success",
        duration: 2000,
        isClosable: true,
      })

      console.log(reallComment)
      setLoading1(false)
 getAutoherCommentSpecif()
 setdataFromPostComeent("")
 

    }else{
      alert("no")
    }

  }
  catch(eroor){
    console.log(`this eroor by ${eroor}`)
    setLoading1(false)
  }
 


 
   
    try{

      const dataBel7oula = await axios.post(
        `/send/notification/author/${userid7oula}`,
        {
          myid: TokenUser._id,
          myidimg: TokenUser.imgUser,
          myusername: TokenUser.username,
          recipientId: userid7oula,
          postImage: imghyf,
          postContent: textf,
          comment:  funca.current.value
        },
        { headers: { 'Content-Type': 'application/json' } } // Ensure the server knows it's JSON
      );
      dataBel7oula ?  funca.current.value="":(     toast({
        title: 'EROOR',
        description: "Something happend Try Later or  relod page :(",
        status: "warning",
        duration: 2000,
        isClosable: true,
      })
)


   }catch(eroor){
     console.log(eroor)
   }


}

 
 
  const getAutoherCommentSpecif  =  async()=>{
    try{

       const  {data}  = await axios.get(`/post-comment/fetchx/${variable}`)
        
       console.log(data.specifCommnt,"here we go")
       setReallComment(data.specifCommnt)
    }
    catch(eroor){
      console.log(`This Eroor by ${eroor}`)
    }
  }
 

useEffect(() => {
 
    getAutoherCommentSpecif();
 
 
}, [cardopen]); // Empty dependency array to run this only on component mount






const [y, setY] = useState(0);
const [hidde,sethidde] = useState(true)
  const scrollRef = useRef(null); // Reference to the div element

  const handleScroll = () => {
    const scrollYPosition = scrollRef.current.scrollTop; // Get the vertical scroll position inside the div
    setY(scrollYPosition);
    
    if(scrollYPosition>351){
      sethidde(false)
    }else{
       sethidde(true)
    }
  };

  useEffect(() => {
    const divElement = scrollRef.current;

    // Add scroll event listener to the div
    if (divElement) {
      divElement.addEventListener("scroll", handleScroll);
    }

    // Clean up event listener on component unmount
    return () => {
      if (divElement) {
        divElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

const funcIclicktoThisButton =()=>{
 setcardopen(false)
}

const [testCard2,settestCard2] = useState(true)


//---------------------------------------------------------------------------------
const [ase,setttofc] = useState([])
const notify = async()=>{
  try{
    const {data} = await axios.post(`/send/notification/author/${TokenUser._id}`)
     
   // setttofc(data)
   setttofc(data.noTifaction)
    console.log(data.noTifaction)

  }catch(eroor){
    console.log(eroor)
  }
}
 
useEffect(()=>{
  notify()
 
},[])
 
const [postamn,setpostamn] = useState(true)
const [showNotfication,setshowNotfication] = useState(false)
// the goals  why i stared this false in my account cause i 
// dont wan't see this notficatiob by dafult in thi pa
const [dataofNotfication,setdataNotifaction] = useState([])
const funcQ = async()=>{
  try{
   const {data} = await axios.get(`/get/notifacation/${TokenUser._id}`)
   
   setdataNotifaction(data)
   console.log(data)
  }
  catch(eroor){
   console.log(eroor)
  }
}

// useEffect(()=>{funcQ()},[])
useEffect(()=>{funcQ()
  console.log(dataofNotfication,"this data good")
},[showNotfication])


const [warzone,setwarzone] = useState(false)
// here we gonna build function Heart 
const DetactLikes = (item)=>{
   
   setwarzone((prev)=>!prev)
      
}
useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get('/post-comment/fetch');
      setfetchPostsFromDataBase(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  fetchData();  // Call the function inside useEffect
}, [warzone]);  // Track warzone changes



const [FilterReversePost,setFilterReversePost] =useState(false)
useEffect(()=>{
   const arr =fetchPostsFromDataBase
  
 let ins = [];   
  let t = [];    // Randomly selected 
  

 const  find=(s, ins) =>{
   return ins.some(index => index === s); 
 }

 let i = 0;
 while (i < arr.length) {
   let s = Math.floor(Math.random() * arr.length);  // Generate a random index

//   // Keep generating until we find an unused index
  while (find(s, ins)) {
    s = Math.floor(Math.random() * arr.length);
  }

   ins.push(s);  // Save the used index
   t.push(arr[s]);  // Store the corresponding post
   i++;
 }


 console.log(t);    // Shows randomly selected posts
 setfetchPostsFromDataBase(t) 
},[FilterReversePost])


const [vote,setVote] = useState("1000000")
const [miniScreen,setminiScreen] = useState(false)

const [openIframe,setOpenIframe] = useState(false)


// web socket here we go 🎉🎉🎉🎉🎉

// useEffect(() => {
//   socket.on("message", (data) => {
//     console.log(data);
//   });

//   // Clean up to avoid duplicate listeners
//   return () => {
//     socket.off("message");
//   };
// }, []);



const [not,setnot] = useState(0)
const [change,setikill] = useState(false)
const audio = new Audio('/music/reallChat.mp3');
useEffect(() => {
 

  //Register the listener once
  socket.on(`${TokenUser._id}`, data=>{
    console.log(data)
   console.log(data,change)
  //  data && setikill((prev)=>!prev)
    setnot((prev)=>prev+1)
 
  toast({
    position: 'top-right',
    duration: 3000,
    isClosable: true,
    status: 'success',
    render: () => (
      <Box 
        display="flex" 
        alignItems="center" 
        p={4} 
        bg="orange.500" 
        borderRadius="md"
        boxShadow="lg"
      >

<Avatar 
          src={`${data.data.myidimg}`} 
          size="sm" 
          mr={3} 
        />

      
        <ChakraText color="white" fontWeight="bold">
           {data.data.myusername}  type  a notification for you  mr <Avatar 
          src={`${TokenUser.imgUser}`} 
          size="sm" 
          mr={3} 
        />
 
        </ChakraText>
 


        
     

      </Box>
    )
  });
  

  
  });

  

}, []);

// useEffect(() => {
 
//     audio.play().catch((error) => {
//       console.error("Error playing sound:", error);
//     });
  
// }, []);  



// this section prodcast all users

useEffect(()=>{


  socket.on("event_post",data=>{
    console.log(data)
     CoffeeTime()
    // if in this data ther ._id like my current id i store this in TokenUser._d => if data.id!=TokenUser._id should be display the the toast their new post in this app 
     if(data.userId!==TokenUser._id){
    
      // toast({
      //   position: 'top',
      //   title: 'Success!',
      //   description: "🎉 some one add new post !",
      //   status: 'success',
      //   duration: 2000, // Toast will last for 5 seconds
      //   isClosable: false, // Adds a close button
      //   containerStyle: {
      //     width: '800px',
      //     maxWidth: '100%',
      //   },
      // });




      toast({
        position: 'top',
        duration: 9000,
        isClosable: true,
        status: 'success',
        render: () => (
          <Box 
            
            display="flex" 
            alignItems="center" 
            p={4} 
            bg="purple.500" 
            borderRadius="md"
            boxShadow="lg"
          >
            <Avatar 
              src={`${data.onwerHasPictuer}`} 
              size="sm" 
              mr={3} 
            />
            <ChakraText color="white" fontWeight="bold">
              {`${data.ownerUserName} Post new Post`} 
            </ChakraText>
          </Box>
        )
      });
      
      
      

     }


  })


},[])
const [openSiri,setOpenSiri] = useState(true)
useEffect(()=>{
  dispatch({type:"SET_SIRI_VOICE",paySiri:false})
},[])
  return (
<> 



<div className='SiriFlex' style={{marginTop:"10px",display:SiriVoice?"flex":"none"}}>
<FlexSiri/>
</div>
    <div className='busky--home' >
            

          <div className='busky--home--container'>

            <div className={`busky--navbar ${open?'openside':"closeside"}`}    > 
            <div className={`busky--navar-seetingrr ${open?"openx":"closex"}`}>
           <div className='busky--navabar--img'>
            
             <img 
              src={`${TokenUser.imgUser}`} 
              style={{objectFit:"cover",cursor:"pointer"}} alt=''
              onClick={()=>settestCard2((prev)=>!prev)}
              />
              <div className='blockCardappear'  style={{display:showNotfication?"block":"none"}}>
               <div className='tileblockcarddpaer' style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}><h1 style={{color:"white",fontWeight:"bold",marginTop:"5px"}}>Notification</h1>
               <small style={{cursor:"pointer"}} onClick={()=>setshowNotfication((prev)=>!prev)}> X</small>
               </div>
               <Tabs variant='soft-rounded' colorScheme='green' >
  <TabList>
    <Tab style={{color:"white",fontWeight:"bold",backgroundColor:"#1C1F26"}} >All activity</Tab>
    <Tab style={{color:"white",fontWeight:"bold",backgroundColor:"#1C1F26",marginLeft:"8px"}}>Likes</Tab>
    <Tab style={{color:"white",fontWeight:"bold",backgroundColor:"#1C1F26",marginLeft:"8px"}}>Comments</Tab>

    
  </TabList>
  <TabPanels>
    <TabPanel>
      <div>
        <div>New</div>
        <div className='flexDdev'>
          
           <div className='fixNewPicture' style={{backgroundColor:"transparent",position: "relative",top:"-21px"}}> 
            <Avatar size='lg'  src={`${TokenUser.imgUser}`}/>
             </div>


           <div className='tea' style={{marginLeft:"17px"}}>
           <h3 style={{color:"white",fontWeight:"bold"}}>Welcome To Your Account <small className='colorChangeName'>{TokenUser.username}</small> </h3>
          <p>Account Updates : Tu recevras <br/>
          désormais une notifacation 
          </p>
           </div>
        </div>


       <div className='title4F'>

        <div className='titleDrake' ><h2>This Week</h2></div>
           <div className='containeroverflow'>

          



           {dataofNotfication.filter(
  (item) => Object.keys(item).length > 0 && item.myusername !== TokenUser.username
).length > 0 ? (
  dataofNotfication
    .filter((item) => Object.keys(item).length > 0 && item.myusername !== TokenUser.username)
     .reverse()
    .map((item) => (
      <div className='flexDdev specifitem' style={{ cursor: "pointer" }} key={item.id}>
        <div className='chbik'>
          <Avatar size='lg' 
          style={{position:"relative",bottom:"10px"}}
          src={`${process.env.REACT_APP_API_KEY}/${item.myidimg}`} />
        </div>
        <div className='tea' style={{ marginLeft: postamn && "17px" }}>
          <h3 style={{ color: "white", fontWeight: "bold" }}>{item.myusername}</h3>
          <p>Liked your comment .{item.createdAt}</p>

          <p style={{ color: 'white', backgroundColor: "#000", width: "100%", fontSize: "13px" }}>
            <details style={{ overflow: "hidden" }}>
              <summary style={{ position: "relative",backgroundColor:"#1a1f26" }} onClick={() => setpostamn((prev) => !prev)}>
                show my comment
              </summary>  
              <div className='overcomment'>
                {item.comment ? item.comment : <em>No comment available.</em>}
              </div>
            </details>
          </p>
        </div>

        <div className='videoComment' style={{ display: postamn ? "block" : "none" }}>
     

           {item.postImage ?    <img
            style={{ borderRadius: "10px", position: "relative", bottom: "10px" }}
            src={item.postImage}
            alt=''
          /> :  
          
          
          <img
          style={{ borderRadius: "10px", position: "relative", bottom: "10px" }}
          src="./smile-circle-svgrepo-com.svg"
          alt=''
        />
        
        }
        </div>

      </div>
    ))
) : (
  <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>No notifications yet.</p>
)}




 
           </div>
       </div>
        
      </div>
      
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
              </div>
              
            <div className='cotainerSetting' style={{position:"absolute"}}>

            <Uix2 close={testCard2} /> 


            </div>

            </div>
         
           <div className='busky--container--section chillNed' id="dd">
            <img src='./imgHome/accueil.png' alt=''/>
            <span>Home</span>
           </div>
          

           <div className='busky--container--section'  id="dd">
            <img src='./imgHome/chercher.png' alt=''/>
            <span>Search</span>
           </div> 

           <div className='busky--container--section'>
           <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}> 
           <img   onClick={()=>setshowNotfication((prev)=>!prev)} src='./imgHome/notification.png' alt=''/>
           <small style={{color:"red",position: "relative",right:"7px",bottom:"8px"}}> {not}</small>
            </div>
           
            <span onClick={()=>{setshowNotfication((prev)=>!prev) 
              setnot(0)}} style={{position:"relative",right:"15px"}}>notification</span>
           </div>
           

           <div className='busky--container--section' style={{display:"flex",alignItems:"center"}}>
           
            <Link to={"/bluskG/freind"}  style={{cursor:"pointer",color:"none"}}  >  <img src='./imgHome/chat.png' alt='' className='moon'/></Link>
            <Link to={"/bluskG/freind"} style={{cursor:"pointer",color:"none"}} > <span>Chat</span></Link>
           </div>
           

           <div className='busky--container--section'>
            <img src='./imgHome/symbole-hashtag.png' onClick={()=>FuncX()} alt=''/>
            <span onClick={()=>FuncX()}> Freind</span>
            
           </div>


         <div className='busky--container--section'  id="dd" >
            <img src='./imgHome/liste-a-puces (1).png' alt=''/>
            <span>Lists</span>
           </div>
 


            <div className='busky--container--section'  id="dd">
            <img src='./imgHome/profil-de-lutilisateur.png' alt=''/>
            <span>Profile</span>
           </div> 

           <div className='busky--container--section'>
            <img src='./imgHome/parametres-cog.png' alt=''/>
            <span>Setting</span>
           </div>
           
           <div className='busky--container--section-new-post'>
           <div className='up' onClick={()=>setPost(true)}>
           <img src='./imgHome/editer.png' alt=''/>
           <span>New Post</span>

           </div>
           </div>
           


            </div>
            </div>
           
            <div className='busky--posts'>
              <div className='screenSize' style={{display:hidde?"block":"none"}}>
              
  <div style={{width:"100",display:"flex",justifyContent:"center"}}> <h2 style={{color:"#fff",fontWeight:"bold",fontSize:"30px"}}>Nahdi</h2>  </div>
                {/* <p style={{color:"white"}}></p>
 
            {
             open ?   <img src='./imgHome/close.png'
              onClick={()=>setopen((prev)=>!prev)}
               className='menuSidebar' alt=''/>
             : (    <img src='./imgHome/menu.png'
              onClick={()=>setopen((prev)=>!prev)}
               className='menuSidebar' alt=''/>
            )
            } */}
            </div>
             <Tabs size='md'defaultIndex={0} > 
                <TabList  style={{display:hidde?"flex":"none"}}>
               
                    <Tab><h1 style={{color:"white",fontSize:"19px",fontWeight:"bold"}}>Discover</h1></Tab>
                    <Tab ><h1 style={{color:"white",fontSize:"19px",fontWeight:"bold"}}>Following</h1></Tab>
                    <Tab><h1  style={{color:"white",fontSize:"19px",fontWeight:"bold"}}>Reels</h1></Tab>
                </TabList>
                

                <TabPanels >
                    <TabPanel className='Discover'  ref={scrollRef}  style={{height:hidde?"85.8898888vh":"100vh"}} >
                    
                                                                     
 
{
 
<>  
{i? 
<> 
<Box padding='10' boxShadow='lg' bg='#161E27' style={{width:"90%"}}>
  <SkeletonCircle size='10' />
  <SkeletonText mt='5' noOfLines={4} spacing='1' skeletonHeight='30'  />
</Box>
<Box padding='10' boxShadow='lg' bg='#161E27' style={{width:"90%"}}>
  <SkeletonCircle size='10' />
  <SkeletonText mt='5' noOfLines={4} spacing='1' skeletonHeight='30'  />
</Box>

</>
  : 
  
fetchPostsFromDataBase
// .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sorting by createdAt
.map((index) => <Posts item={index} key={index.id}  updateMessage  ={updatePost}  passFunc = {CoffeeTime}
 pass2Func  = {DetactLikes}
 
 />)
 
 }
 <div className='iframe' style={{cursor:"pointer",display:"flex",flexDirection:"column",gap:"40px"}}>

 <Link to={"/bluskG/freind"}> <button style={{display:miniScreen?"block":"none",zIndex:3}}   ><img src='./message.png' alt='' style={{width:"40px"}}/></button></Link>
 <button style={{display:miniScreen?"block":"none",zIndex:3}} onClick={()=>setOpenIframe((prev)=>!prev)} ><img src='./423cb91de98e4ee0b31e85d01936961a-free.png' alt='' style={{width:"40px",borderRadius:"20px"}}/></button>

   {miniScreen ? <button className='zina' style={{zIndex:3}} onClick={()=>setminiScreen((prev)=>!prev)}>x</button> :  
 <button className='zina' style={{zIndex:3}} onClick={()=>setminiScreen((prev)=>!prev)}>+</button> 
}
 </div>
 

 <iframe 

 style={{display:openIframe?"block":"none"}}
 src='http://localhost:3000/Headers' 
 
 className='menuPage'/>

 

 
</>

}


                    
                    </TabPanel>
                    <TabPanel>
                    <p>two!</p>
                    </TabPanel>


                    <TabPanel className='Discoverc'>
                     
                      <div className='sectionReels'>
                       
                         {voidReels.map((item)=> <Reels item ={item}/>)}
                       
                         </div>
                    </TabPanel>

         
                    </TabPanels>



                </Tabs>

            </div>


            <div className='busky--search--useres'>
           
           <div className='busky--search--clone'>
           <InputSearch/>
           <br/>
           <hr style={{width:'100%',color:"grey"}}/>
           <div className='busky--links'>
              <h2 className='discover' >Discover</h2>
              <h2 className='Following'>Following</h2>
              <h2 className='more'>More feeds</h2>
           </div>
           <hr style={{width:'100%'}}/>
           <div className='busky--links1'>
              <h2 className='discover' >Feedback</h2>
              <h2 className='Following'>Privacy</h2>
              <h2 className='more'>Terms</h2>
              <h2 className='more'>Help</h2>
              
           </div>
        
 
           </div>
            </div>
          
          </div>
       
       </div><div class="overlay" style={{display:post?'block':'none'}}></div>



        <div className='createPost' style={{display:post?'block':'none'}}>
          
          <div className='createPostCancel'>
             <h1 style={{color:"#0085FF",cursor:"pointer"}} onClick={()=>setPost(false)}>Cancel</h1>
             <div className='post' style={{width:"100px",backgroundColor:"#3182CE"}} ><Button isLoading={loaddingimg}
             onClick={()=>HandelPushPost()}
             colorScheme='blue' >Post</Button></div>
            
          </div>

          <div className='createuserPofile'>
           
          <div className='fig'>
            <Avatar size='md' name='Kent Dodds'  src={`${TokenUser.imgUser}`} /></div>
       
          <textarea 
              
                ref={textareaRef} 
                placeholder='What’s up ?' 
                onInput={handleInput}
                
            />
          
            

          </div>
          <div className='thirdcontainer'>
          
        <div className='rightSideThridIcon'>
        
        <svg
          fill="none"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fill="hsl(211, 99%, 56%)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Zm1 16V5h14v14H5Zm10.725-5.2c0 .566-.283.872-.802.872-.538 0-.848-.318-.848-.872v-3.635c0-.512.314-.826.82-.826h2.496c.35 0 .609.272.609.64 0 .369-.26.629-.609.629h-1.666v.973h1.47c.365 0 .608.248.608.613 0 .36-.247.613-.608.613h-1.47v.993Zm-3.367.872c.526 0 .813-.31.813-.872v-3.627c0-.558-.295-.873-.825-.873s-.825.31-.825.873V13.8c0 .558.302.872.837.872Zm-3.879.078C6.92 14.75 6 13.827 6 12.287v-.617c0-1.47.955-2.42 2.472-2.42.589 0 1.139.147 1.548.388.404.236.664.562.664.915 0 .373-.271.636-.656.636a.82.82 0 0 1-.41-.108 2.34 2.34 0 0 1-.271-.177c-.208-.148-.421-.3-.746-.3-.644 0-.95.38-.95 1.155v.52c0 .768.306 1.168.903 1.168.436 0 .735-.248.735-.61v-.061h-.146c-.412 0-.632-.194-.632-.551 0-.353.216-.535.632-.535h.806c.617 0 .884.256.884.834v.166c0 1.253-.92 2.06-2.354 2.06Z"
          />
        </svg>
          <svg fill="none" viewBox="0 0 24 24" width="24" height="24"><path fill="hsl(211, 99%, 56%)" fill-rule="evenodd" clip-rule="evenodd" d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4Zm2 1v2h2V5H5Zm4 0v6h6V5H9Zm8 0v2h2V5h-2Zm2 4h-2v2h2V9Zm0 4h-2v2.444h2V13Zm0 4.444h-2V19h2v-1.556ZM15 19v-6H9v6h6Zm-8 0v-2H5v2h2Zm-2-4h2v-2H5v2Zm0-4h2V9H5v2Z"></path></svg>
           {/* //////////////////////////// */}
           <div>
      <label style={{ cursor: 'pointer' }}>
      <svg fill="none" viewBox="0 0 24 24" width="24" height="24"><path fill="hsl(211, 99%, 56%)" fill-rule="evenodd" clip-rule="evenodd" d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4Zm2 1v7.213l1.246-.932.044-.03a3 3 0 0 1 3.863.454c1.468 1.58 2.941 2.749 4.847 2.749 1.703 0 2.855-.555 4-1.618V5H5Zm14 10.357c-1.112.697-2.386 1.097-4 1.097-2.81 0-4.796-1.755-6.313-3.388a1 1 0 0 0-1.269-.164L5 14.712V19h14v-3.643ZM15 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-3 1a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"></path></svg>
        <input
          type="file"
          onChange={(e)=>handleFileChange(e)}
          style={{ display: 'none' }} // Hide the file input
          name ="file"
        />
      </label>
 
    </div>
           {/* ////////////////////// */}
        </div>
        <div className='progress' > 
           <h1 style={{color:"#0085FF",fontWeight:"bold"}}>English</h1>
           <h1 style={{color:"white",fontWeight:"bold"}}>{k-Number(textAra?.length)}</h1>
           <CircularProgress value={textAra.length} size={'30px'} />
        </div>


          </div>

        </div>
{/* /// section comment 🎉 */}
        <div className='SectionComment' style={{display:CommentPost ? 'block':'none'}}>
           <div className='big'>
            <div className='routerComment'>
               <div className='routerCommentIcon' >

   
                  <div className='rightyt'>
                  <span class="material-symbols-outlined" style={{fontSize:"20px"}}  >arrow_back_ios</span>
                  <span class="material-symbols-outlined" style={{fontSize:"20px"}}  >arrow_forward_ios</span>
                  </div>
                  
                    <div   onClick={()=>setCommentPost((prev)=>!prev)}>
                      <h1>X</h1>
                      </div>
                      
               </div>
            </div>
            <div className='sectionCommentDescsiprion'>
              <h1>I Built a This  app  in 40 Days  with Me</h1>
              <div className='pargraph'>
                 
                <p>
                {/* TLDRAn AI company, Cicero, has developed an AI avatar trained on Avi Loeb’s public appearances, promising features like phone call, text message, and full visual replica. This technology aims to save time by handling repetitive tasks and preserving personal narratives. AI avatars could evolve dramatically in the next decade, Show more */}
                {textf}
                </p>
              </div>
            </div>

     <div className='tagAndMention'>
      <span  className='mentionWebTracking'>#web dev</span>
      <span className='mentionWebTracking' >#java script</span>
      <span className='mentionWebTracking'>#node js</span>
    
      <div className='timeCreated'><p>{new Date(creatTime).toLocaleDateString()}</p></div>
     </div>
      


 <div className='imgPost' style={{display:imghyf=="" && "none"}}>

  <div className='imgPostContainer'>
    {/* <img src='https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/b8d4f161c390d0ca1d22808f4faaf705?_a=AQAEuiZ'/>
     */}
     {/* <img src={imghyf} alt=''/> */}
     {imghyf.includes('/video/upload') ? (
    <video controls  >
      <source src={imghyf} type="video/mp4" />
       
    </video>
  ) : (
   
    imghyf==""?  <img src="https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/b8d4f161c390d0ca1d22808f4faaf705?_a=AQAEuiZ" alt='' /> :  <img src={imghyf} alt='' />

  )}
  </div>
 </div>



<div className='nmuberofcomment'>
  <h1>999 Upvotes</h1> <h1>{reallComment.length} comments</h1>
</div>

<div className='numberOfVoteButton'>
 
<div className='topFlop'>
  
 <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z" fill="currentcolor" fill-rule="evenodd"></path></svg>
<svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none rotate-180"><path d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z" fill="currentcolor" fill-rule="evenodd"></path></svg>

</div>
<div className='commentFlopTop'>
<div className='samex'> 
<svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M8.084 3.217a35.447 35.447 0 017.05-.078l.782.078.279.031c1.089.121 1.885.372 2.606.828a4.516 4.516 0 011.664 1.86c.336.69.5 1.423.53 2.361l.005.321v3.975a4.493 4.493 0 01-3.545 4.392l-.207.04-2.089.346-2.86 2.992-.147.135c-.986.789-2.399.623-3.205-.324-.532-.625-.616-1.34-.51-2.29l.029-.224.038-.254.033-.187-1.332-.189a5.011 5.011 0 01-1.677-.55l-.253-.146-.243-.16a4.777 4.777 0 01-1.491-1.721 4.935 4.935 0 01-.532-1.972l-.009-.3V8.618c0-1.096.162-1.915.535-2.683.375-.77.94-1.4 1.664-1.859.649-.41 1.359-.655 2.288-.788l.318-.04.28-.031zm7.666 1.491a33.948 33.948 0 00-6.752-.075l-.748.075-.28.031c-.915.102-1.481.297-1.97.606a3.016 3.016 0 00-1.116 1.247c-.228.468-.357.989-.38 1.76l-.004.266v3.563c0 .577.134 1.116.375 1.587.242.471.592.874 1.024 1.18.37.263.801.453 1.276.554l.242.043 1.98.283c.339.048.457.096.575.175.119.078.262.187.27.386l-.002.024-.013.08-.164.741-.064.333c-.111.63-.167 1.332.09 1.634.263.309.7.39 1.037.187l.089-.062 2.998-3.135.13-.101.092-.063.077-.04.08-.03.035-.01.087-.02L17 15.545a2.993 2.993 0 002.495-2.77l.005-.182V8.618c0-.921-.13-1.506-.384-2.026A3.016 3.016 0 0018 5.345c-.44-.278-.943-.464-1.706-.572l-.265-.034-.279-.03zm-.55 6.294l.093.005c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005c-.398-.044-.707-.36-.707-.745 0-.38.301-.694.691-.744l.109-.007h6.4zm0-3.5l.093.004c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005C8.309 8.953 8 8.637 8 8.252c0-.38.301-.694.691-.744l.109-.007h6.4z" fill="currentcolor" fill-rule="evenodd"></path></svg>
      
      
         <span>comment</span>
  </div>

</div>


<div className='bookMarks'>
<div className='samex'> 
<svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M15.874 3H8.126a3.357 3.357 0 00-3.35 3.152l-.772 12.77c-.028.459.106.915.38 1.286l.101.125c.666.764 1.818.9 2.647.287L12 17.023l4.868 3.597a1.964 1.964 0 003.128-1.7l-.771-12.767A3.358 3.358 0 0015.874 3zm0 1.5c.981 0 1.794.764 1.854 1.744l.771 12.768a.464.464 0 01-.74.402l-5.207-3.848a.929.929 0 00-1.104 0L6.24 19.414a.464.464 0 01-.74-.402l.773-12.768c.06-.98.872-1.744 1.853-1.744h7.748z" fill="currentcolor" fill-rule="evenodd"></path></svg>
        
         <span>bookMarks</span>
  </div>
</div>

 

</div>

<div className='SectionCurrentPost'>

  <div className='containerAppF' style={{ display: 'flex'  , alignItems: 'center'}} >
    
  
    <div className='imgconainerPdf'>  <img src={`${TokenUser.imgUser}`} alt='' /></div>
    <div className='shareButtonS'>  
 <input
  type="text"
  placeholder={`Share your thoughts ${TokenUser.username}`}
  ref={funca}
 
  onFocus={(e) => (e.target.style.border = 'none')}
  
/>

      </div>

     <div className='buttonPost'>
      
     {loading1?  <Spinner/>   : <button onClick={()=>PostCommentA()}>
      <img src="./blueINdex.svg" alt='' style={{width:'25px', objectFit:"cover"}}/>
     </button> }
     </div>
   
 
    </div>

</div>




{/* reall Comment : ))))  */}

<div className='awsomeComment' ref={commentRef} > 

  <div className='autoPaddingWithHeightelmentInsideit'>

      
 
 
    {reallComment && reallComment.map((item)=>
    
  
    
    
    
    <div className='GhaithNahdi' >
 
 
<div className='cardcomment'>

  
<div className='userInfoCardComment' style={{display:"flex",alignItems:"center"}}>

<div className='img'><img  src={`${item.ProfileImg}`}

style={{width:"40px",height:"40px",objectFit:"cover"}}  alt=''/></div>
<div className='userInsideInfo' style={{marginLeft:"10px"}}>
<p>{item.UsernameComment}</p>
<p className='gmail'>Ghaith@gmail.com <span style={{color:"#c3c3c3"}}>{new Date(item.createdAt).toLocaleDateString()}</span> </p>

</div>
</div>
{/* <div className='imgUserContent'> <img src='https://picsum.photos/id/237/200/300' alt=""/></div> this palce img iwanna handel */}
<div className='userContent'>{item.comment} 🎉 </div>
<div className='shareInThing'>
<div className='shaireThingIcon0'>

<svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z" fill="currentcolor" fill-rule="evenodd"></path></svg>
<svg 
width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none rotate-180"><path d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z" fill="currentcolor" fill-rule="evenodd"></path></svg>

<svg  style={{cursor:"pointer"}} onClick={()=>func(item)} width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M8.084 3.217a35.447 35.447 0 017.05-.078l.782.078.279.031c1.089.121 1.885.372 2.606.828a4.516 4.516 0 011.664 1.86c.336.69.5 1.423.53 2.361l.005.321v3.975a4.493 4.493 0 01-3.545 4.392l-.207.04-2.089.346-2.86 2.992-.147.135c-.986.789-2.399.623-3.205-.324-.532-.625-.616-1.34-.51-2.29l.029-.224.038-.254.033-.187-1.332-.189a5.011 5.011 0 01-1.677-.55l-.253-.146-.243-.16a4.777 4.777 0 01-1.491-1.721 4.935 4.935 0 01-.532-1.972l-.009-.3V8.618c0-1.096.162-1.915.535-2.683.375-.77.94-1.4 1.664-1.859.649-.41 1.359-.655 2.288-.788l.318-.04.28-.031zm7.666 1.491a33.948 33.948 0 00-6.752-.075l-.748.075-.28.031c-.915.102-1.481.297-1.97.606a3.016 3.016 0 00-1.116 1.247c-.228.468-.357.989-.38 1.76l-.004.266v3.563c0 .577.134 1.116.375 1.587.242.471.592.874 1.024 1.18.37.263.801.453 1.276.554l.242.043 1.98.283c.339.048.457.096.575.175.119.078.262.187.27.386l-.002.024-.013.08-.164.741-.064.333c-.111.63-.167 1.332.09 1.634.263.309.7.39 1.037.187l.089-.062 2.998-3.135.13-.101.092-.063.077-.04.08-.03.035-.01.087-.02L17 15.545a2.993 2.993 0 002.495-2.77l.005-.182V8.618c0-.921-.13-1.506-.384-2.026A3.016 3.016 0 0018 5.345c-.44-.278-.943-.464-1.706-.572l-.265-.034-.279-.03zm-.55 6.294l.093.005c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005c-.398-.044-.707-.36-.707-.745 0-.38.301-.694.691-.744l.109-.007h6.4zm0-3.5l.093.004c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005C8.309 8.953 8 8.637 8 8.252c0-.38.301-.694.691-.744l.109-.007h6.4z" fill="currentcolor" fill-rule="evenodd"></path></svg>
<svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M15.874 3H8.126a3.357 3.357 0 00-3.35 3.152l-.772 12.77c-.028.459.106.915.38 1.286l.101.125c.666.764 1.818.9 2.647.287L12 17.023l4.868 3.597a1.964 1.964 0 003.128-1.7l-.771-12.767A3.358 3.358 0 0015.874 3zm0 1.5c.981 0 1.794.764 1.854 1.744l.771 12.768a.464.464 0 01-.74.402l-5.207-3.848a.929.929 0 00-1.104 0L6.24 19.414a.464.464 0 01-.74-.402l.773-12.768c.06-.98.872-1.744 1.853-1.744h7.748z" fill="currentcolor" fill-rule="evenodd"></path></svg>


</div>
<div><p>2 UpVotes</p></div>
 
</div>
 

{/* ----nestaed comopennt  */}
{item.replies && item.replies.length > 0 && (

  item.replies.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
  .map((reply)=><>

<div style={{marginLeft:'60px',marginTop:"10px"} }
>
  
  <div className='line' style={{background:"transparnt",width:"34px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column" }} >
    <div className='menuCercleforcomment rotateD'><span class="material-symbols-outlined" style={{fontSize:"20px",color:"grey"}}>radio_button_unchecked</span></div>
   <img src='./imgHome/line.png' alt='' style={{height:"60px",width:"4px"}}/>
 
   <div className='containerIndeideNestedComment traficant'>
    <span class="material-symbols-outlined" style={{width:"3px"}} >keyboard_arrow_down</span>
    
    </div>

  </div>
  
  <div className='userInfoCardComment'  style={{marginTop:"10px",display:"flex",flexDirection:"row",alignItems:"center"}}  >

<div className='img'><img  src={`${reply.ProfileImg}`}  style={{width:"40px",height:"40px",objectFit:"cover"}} alt=''/></div>
<div className='userInsideInfo' style={{marginLeft:"10px"}}>
<p>{reply.UsernameComment}</p>
<p className='gmail'>{reply.UsernameComment}@gmail.com <span style={{color:"#c3c3c3"}}>{new Date(reply.createdAt).toLocaleDateString()}</span></p>

</div>
</div>
{/* <div className='imgUserContent'> <img src='https://picsum.photos/id/237/200/300' alt=""/></div> this img place img  */}
<div className='userContent' style={{marginTop:"10px",marginBottom:"10px"}}>{reply.comment}🎉 </div>
<div className='shareInThing'>
<div className='shaireThingIcon0'>


<div className='bourch' style={{display:"flex",alignItems:"center",background:"red",width:"auto",justifyContent:"space-between"}}>
<svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z" fill="currentcolor" fill-rule="evenodd"></path></svg>
 
{Number(vote) < 1000 ? (
  <span>{vote}</span>
) : Number(vote) < 1000000 ? (
  <span>{Math.floor(Number(vote) / 1000)}k</span>
) : (
  <span>{Math.floor(Number(vote) / 1000000)}M</span>
)}
<svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none rotate-180"><path d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z" fill="currentcolor" fill-rule="evenodd"></path></svg>

</div>
{/* <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M8.084 3.217a35.447 35.447 0 017.05-.078l.782.078.279.031c1.089.121 1.885.372 2.606.828a4.516 4.516 0 011.664 1.86c.336.69.5 1.423.53 2.361l.005.321v3.975a4.493 4.493 0 01-3.545 4.392l-.207.04-2.089.346-2.86 2.992-.147.135c-.986.789-2.399.623-3.205-.324-.532-.625-.616-1.34-.51-2.29l.029-.224.038-.254.033-.187-1.332-.189a5.011 5.011 0 01-1.677-.55l-.253-.146-.243-.16a4.777 4.777 0 01-1.491-1.721 4.935 4.935 0 01-.532-1.972l-.009-.3V8.618c0-1.096.162-1.915.535-2.683.375-.77.94-1.4 1.664-1.859.649-.41 1.359-.655 2.288-.788l.318-.04.28-.031zm7.666 1.491a33.948 33.948 0 00-6.752-.075l-.748.075-.28.031c-.915.102-1.481.297-1.97.606a3.016 3.016 0 00-1.116 1.247c-.228.468-.357.989-.38 1.76l-.004.266v3.563c0 .577.134 1.116.375 1.587.242.471.592.874 1.024 1.18.37.263.801.453 1.276.554l.242.043 1.98.283c.339.048.457.096.575.175.119.078.262.187.27.386l-.002.024-.013.08-.164.741-.064.333c-.111.63-.167 1.332.09 1.634.263.309.7.39 1.037.187l.089-.062 2.998-3.135.13-.101.092-.063.077-.04.08-.03.035-.01.087-.02L17 15.545a2.993 2.993 0 002.495-2.77l.005-.182V8.618c0-.921-.13-1.506-.384-2.026A3.016 3.016 0 0018 5.345c-.44-.278-.943-.464-1.706-.572l-.265-.034-.279-.03zm-.55 6.294l.093.005c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005c-.398-.044-.707-.36-.707-.745 0-.38.301-.694.691-.744l.109-.007h6.4zm0-3.5l.093.004c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005C8.309 8.953 8 8.637 8 8.252c0-.38.301-.694.691-.744l.109-.007h6.4z" fill="currentcolor" fill-rule="evenodd"></path></svg>
<svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M15.874 3H8.126a3.357 3.357 0 00-3.35 3.152l-.772 12.77c-.028.459.106.915.38 1.286l.101.125c.666.764 1.818.9 2.647.287L12 17.023l4.868 3.597a1.964 1.964 0 003.128-1.7l-.771-12.767A3.358 3.358 0 0015.874 3zm0 1.5c.981 0 1.794.764 1.854 1.744l.771 12.768a.464.464 0 01-.74.402l-5.207-3.848a.929.929 0 00-1.104 0L6.24 19.414a.464.464 0 01-.74-.402l.773-12.768c.06-.98.872-1.744 1.853-1.744h7.748z" fill="currentcolor" fill-rule="evenodd"></path></svg> */}


</div>
<div><p>2 UpVotes</p></div>
</div>
</div>




  </>)
)}

 


</div>




 



  </div>
    
    
    
    
    
 
    
    
    
    
    
    
    
    
    
    )}


  </div>
   




  
</div>














           </div>

           <div className='small'></div>
        </div>



        
<div className='containertest'  onClick={()=>setFilterReversePost((prev)=>!prev)}>
<svg viewBox="0 0 448 512" height="19" width="19" tabindex="-1"><path fill="hsl(211, 20%, 100%)" d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"></path></svg>
</div>
 
    <div className='replyComment'  style={{display:cardopen?"block":"none"}}>

    <Input item ={tompData} Authorized={dataFromPostComeent} HandelClick  ={funcIclicktoThisButton}/>
    </div>

     <div className="cercle"  style={{display:postLoading?"block":"none"}} >
    <Spinner  size='xl' style={{color:"green"}} />
    
    </div> 


    </>
    
  )
}

export default BuskyHome
