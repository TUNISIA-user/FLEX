import React, { useEffect, useRef, useState } from 'react'
import "./reallChat.css"
import { Avatar, AvatarBadge, Button, Divider, Flex, Spinner, useToast } from '@chakra-ui/react'
import { useGlobalContext } from '../Store/GlobalContext'
import axios from '../Component/axios'
import { useNavigate } from 'react-router-dom'
import ThreePoint from '../FirstView/ThreePoint'
import BlockUsers from './BlockUsers'
import { Progress } from '@chakra-ui/react'
// this 2 function for wokring with ai inside this appliaction
import "regenerator-runtime/runtime"; 
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import sendIcon from './send.png';
import FlexSiri from '../aiModels/FlexSiri'
import AudioRecorder from './AudioRecorder'
// this for vocale recorder // 
import ReactAudioPlayer from "react-audio-player";
import SiriWave from "react-siriwave";
import { AudioPlayer } from 'react-audio-player-component';
import { arr } from './APIJsoin'

const ReallChat = () => {



   
  const [template,settemplate] = useState(true)

  // this for template choise 
  const audio = new Audio("./PranciapleVoice.mp3"); // Update with your audio file path
  const [VoiceMessageClose,setMessageVoiceClose]= useState(false)
  const [LoadingVoiceClose,setLoadingCloseMessage] = useState(false)
  const [helpAi,sethelpAi] = useState(false)
  const Nav = useNavigate()
  const [input, setInput] = useState("")
  const [Wallper,setwalpper]  = useState("") // start fix this 

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortedMessages, setSortedMessages] = useState([])
  const { currentUser, TokenUser,dispatch ,currentPictuer,StartRecodingValue} = useGlobalContext()
  const  Useref = useRef(null)
  const [image, setImage] = useState(null);
  const [currentRealOpen,setcurrenRealOpen] = useState(false)
  const [lastSeen,setLastSeen] = useState('')
  const [statusUser,setstatusUser] = useState("")
  const  [stop,setstopx]  = useState("f")
  const [iclick,seticlick] = useState(false)
  const REP = useRef(null);
  const toast = useToast()

// do request 


const sendRquestThemeToDataBase = async(Theme)=>{
 
    setwalpper(Theme)
    settemplate(true)
  
  try{  
      const SendRequest = await axios.post(`/ChangeTehme/${TokenUser._id}`,{
        userId  :currentUser[0]._id,
        nameTheme:Theme
      })
   
      
  }catch(eror){
       
    toast({
      position:"top",
      title: "EROOR",
      description: "Something went wrong reload Page To Solve Probllem",
      status: "warning",
      duration: 1000,
      isClosable: true,
    })
  }
}

























 
const StoreMessages = useRef(null)
const [openSiri,setOpenSiri] = useState(false)
const [isLoadingForDeleltMessage,setisLoadingForDeleltMessage] = useState(false)

// start working with messages voice


const [isRecordingActive, setIsRecordingActive] = useState(false);
const [recordedAudioURL, setRecordedAudioURL] = useState("");
const mediaRecorderRef = useRef(null);
const audioChunksRef = useRef([]);
const streamRef = useRef(null);



 
const startRecording = async () => {
   
  setIsRecordingActive(true);
  audioChunksRef.current = [];

  // Request audio stream and store in ref
  streamRef.current = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  mediaRecorderRef.current = new MediaRecorder(streamRef.current);

  mediaRecorderRef.current.ondataavailable = (event) => {
    audioChunksRef.current.push(event.data);
  };

  mediaRecorderRef.current.onstop = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("file", audioBlob);
    formData.append("upload_preset", "ask-app"); // Set your Cloudinary upload preset here
    formData.append("folder", "upload/voice");  // do this to specif folder in this app ///    

    try {
      setLoadingCloseMessage(true)
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dfmdgsiid/upload`,
        formData
      );
      setRecordedAudioURL(response.data.secure_url);
      console.log("Audio uploaded:", response.data.secure_url);
      setLoadingCloseMessage(false)
    } catch (error) {
      console.error("Error uploading audio:", error);
      setLoadingCloseMessage(true)
    }
  };

  mediaRecorderRef.current.start();
};

const stopRecording = () => {
  
  setIsRecordingActive(false);
  mediaRecorderRef?.current?.stop();

  // Stop all tracks to release the microphone
  streamRef.current.getTracks().forEach((track) => track.stop());
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    border: "2px solid #007bff",
    borderRadius: "10px",
    backgroundColor: "#f8f9fa",
    width: "300px",
    margin: "auto",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
 
  recordingButton: {
    backgroundColor: "#dc3545", // Red color when recording
  },
  audioPlayer: {
    marginTop: "20px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "10px",
    fontWeight: "normal",
    color: "#333",
  },
};
useEffect(()=>{

  if(isRecordingActive==true){
    handleStop()
  }
 },[isRecordingActive])


 useEffect(()=>{

  if(isRecordingActive==false){
    handleManualStart()
  }
 },[isRecordingActive])


useEffect(()=>{
  recordedAudioURL && setMessageVoiceClose(true)
},[recordedAudioURL])


// here should be past 2 function for this  and paste styles 
const handleManualStart = () => {
  SpeechRecognition.startListening({ continuous: true });
  setIsListening(true);
}; // fix this eroor handel button


const handleStop = async() => {
  await  SpeechRecognition.stopListening();
setIsListening(false);
};




useEffect(()=>{

StartRecodingValue==true && handleStop();
},[StartRecodingValue])






  const HandelChunk = async()=>{
 
    if(StoreMessages.current.value.length==0 && !image  & !recordedAudioURL ){
   
      
      toast({
        position:"top",
        title: "EROOR",
        description: "Type Something a least 1 chr",
        status: "warning",
        duration: 1000,
        isClosable: true,
      })
    }


   else{

     
    seticlick((prev)=>!prev)
  
    setLoading(true)
    const newMessage = {
      senderId: TokenUser._id,   // Assuming TokenUser is the sender
      content: input,
      timestamp: new Date().toISOString(),  // Adding the timestamp immediately
      
     
    };
    setMessages([...messages,newMessage])
    try{
     const data=  await axios.post(`/accesMessage/${currentUser[0]._id}`,{
       userId :  TokenUser._id ,
       txt : StoreMessages.current.value ,
       imgUser :image ||recordedAudioURL,
       vue :"oui",
       imgProfile : TokenUser.imgUser,
       voiceMessage:'this should be voic message'

 
      })
      
      console.log(data,"data")
      setLoading(false)
      StoreMessages.current.value=""
      setImage("")
      setInput("")
     //---------
     sethelpAi(false)
     resetTranscript()
     setCapture(false)   // tgus this request 
     setInput("")
     setMessageVoiceClose(false)
       
   }catch(eroor){
     console.log(eroor)
     setLoading(false)
     
   }

   
   }

   
 
  }

   useEffect(() => {
 
     Useref.current.scrollIntoView({ behavior: "smooth" });
 
     Useref.current.scrollIntoView({ behavior: "smooth" });
 
      
     Useref.current.scrollIntoView({ behavior: "smooth" });
 

   
   }, [loading]);


   
   useEffect(() => {
 
    Useref?.current.scrollIntoView({ behavior: "smooth" });

    

  
  }, []);



  
  // useEffect(() => {
  //  Useref.current.scrollIntoView({ behavior: "smooth" });
  // }, []);



// Useref.current?.scrollIntoView({behavior:"smooth"})

const [block,setBlock] = useState(false)
const [rayzen,setRayzen] = useState([])

    const Conversation =async ()=>{
      try{
        const {data} = await  axios.post(`/get/access/message/${TokenUser?._id}`,{
          userId : currentUser[0]?._id
        })
      
         // can i do inverse message here i wanna last message sned appear in top ? 
       setMessages(data.messages);
       setBlock(data.Block)
      
       setwalpper(data.tehmeTemplte)

      }
      catch(eroor){
        console.log(`This eroor by ${eroor}`)
      }
    }



    //   setRayzen(data.DataBlocker)


    const getBlocker =async ()=>{
      try{
        const {data} = await  axios.post(`/get/access/message/${TokenUser?._id}`,{
          userId : currentUser[0]?._id
        })
      
       
        setRayzen(data.DataBlocker)
        console.log(data.DataBlocker,"fiee")
      }
      catch(eroor){
        console.log(`This eroor by ${eroor}`)
      }
    }
    



  // useEffect(()=>{
  //   console.log(TokenUser._id,"import")
  //   console.log(currentUser[0]._id,"import")
  
  // },[])



    const getLastSeen = async()=>{
      try{
          const {data} = await axios.get(`/get/date/user/${currentUser[0]._id}`)
          // console.log('lastMessage',data.LastSeen,'status',data.isOnline,data.waiting)
          setLastSeen(data.LastSeen)
          setstatusUser(data.isOnline)
          setstopx(data.waiting)
      }catch(eroor){
          console.log(`This Eroor ${eroor}`)
      }
    }
    
    
    





   useEffect(()=>{
   const interval = setInterval(() => {
    Conversation();
    getLastSeen()
      
  },1000); // Fetch messages every 3 seconds
  return () => clearInterval(interval); 
   },[])


  
  //  useEffect(()=>{
  // console.log(Useref?.current?.scrollIntoView({behavior:"smooth"}))
  //  },[messages])
  const Log = ()=>{
    localStorage.clear()
    Nav("/auth")
    
  }

  


  const UpdateUser = async()=>{
    try{
      const UpdateUser  = await axios.post(`/update/user/status/${TokenUser._id}`)

      
    }catch(eroor){
      console.log(`this eroor by ${eroor}`)
    }
  }

  
  const OfflineUser = async()=>{
    try{
      const UpdateUser  = await axios.post(`/update/offline/user/status/${TokenUser._id}`)

      console.log(UpdateUser,"close success")
    }catch(eroor){
      console.log(`this eroor by ${eroor}`)
    }
  }



  useEffect(()=>{
   console.log(TokenUser._id,"current status")
    UpdateUser()
  },[])

  useEffect(()=>{
      window.addEventListener('beforeunload',OfflineUser)
      
      return ()=>{
        window.removeEventListener('beforeunload',OfflineUser)
      }
  },[])
 



// useEffect(()=>{
//   console.log(currentUser,"ff")
// },[])

 
const handleImageChange = async (e) => {
  const selectedImage = e.target.files[0];
  setImage(selectedImage); // Update state with the selected image
 
  // Ensure an image is selected
  if (!selectedImage) return;

  const formData = new FormData();
  formData.append("file", selectedImage);
  formData.append("upload_preset", 'ask-app'); // Replace with your Cloudinary upload preset
  setLoading(true)
  try {
    // Upload the image to Cloudinary
    const uploadResponse = await axios.post(
      'https://api.cloudinary.com/v1_1/dfmdgsiid/upload', // Replace with your Cloudinary cloud name
      formData
    );
    console.log(uploadResponse.data.secure_url); 
    setImage(uploadResponse.data.secure_url)
    setLoading(false)
  } catch (error) {
    console.log(`This error is caused by ${error}`); // Corrected typo in "error"
    setLoading(false)
  }
};
const HandelSeeMessage = (b)=>{
  console.log(b)
  dispatch({
    type : 'CURRENT__PIC',
    paylod : b
  })
  setcurrenRealOpen(true)
}

 


 

const HadndelTyping = async()=>{
  try{
      await  axios.post(`/set/typing/${TokenUser._id}`,{
      isTyping : "Typing"
    })
    
  }
  catch(eroor){
    console.log(eroor)
  }
}
 

const HandelCloseTyping = async()=>{
  try{
      await  axios.post(`/set/typing/${TokenUser._id}`,{
      isTyping : "close"
    })
    
  }catch(eroor){
    console.log(`This Eroor by ${eroor}`)
  }

}
useEffect(()=>{
  console.log(messages)
},[])

const [loadingMessages,setLoadingMessages] = useState(false)

const HandelDelteMyMessages =async(b)=>{
  setLoadingMessages(true)
  setisLoadingForDeleltMessage(true)
  try{
      const DelteMyChat = await axios.post(`/delete/access/message/${TokenUser._id}`,{

        userId:currentUser[0]._id,
        messageId:b._id

    })
    setLoadingMessages(false)
    setisLoadingForDeleltMessage(false)
  }
  catch(eroor){
    console.log(eroor)
    setLoadingMessages(false)
    setisLoadingForDeleltMessage(false)
  }

}

// other world 

const [progressBar,setProgressBar] = useState(false)

const helpPassToBlockUserFunction =(y) =>{
  setProgressBar(y)
}

const [open,setopen] = useState(false)
// const HandelThisOpen  = (x)=>{
//   setopen(x)
// }

const [asus,setassus] = useState(false)
const rio =()=>{
  setopen((prev)=>!prev)
  getBlocker()
  setassus(true)
  
}

const handleKeyPress = (e) => {
  if (e.key === 'Enter' && input.trim()) {
    HandelChunk();
  }
};

// useEffect(()=>{
//     setTimeout(() => {
//       REP.current.click();
//     }, 3000);
// },[])


const { transcript, resetTranscript } = useSpeechRecognition();
const [isListening, setIsListening] = useState(false);
const [triggered, setTriggered] = useState(false); // Track if keyword is triggered
 const [voiceCommand, setVoiceCommand] = useState("");

 
 let timer;

//     // Start listening immediately to detect "Hello Flex"
useEffect(() => {
  SpeechRecognition.startListening({ continuous: true });
  setIsListening(true);

  return () => {
  SpeechRecognition.stopListening();
  clearTimeout(timer);
  };
}, []);

const [capTure,setCapture] = useState(false)
 
useEffect(() => {
console.log("Live Transcript:", transcript); // Debug: Check transcript in real-time


if(transcript.toLowerCase().trim().includes("return") || transcript.toLowerCase().trim().includes("to home")){
  dispatch({type:"SET_SIRI_VOICE",paySiri:false})
Nav("/bluskG")

}



if(transcript.toLowerCase().trim().includes("flex")){
  console.log("we gonna start listen to you")
  sethelpAi(true)
  resetTranscript()
  setCapture(true)
  setInput("")
  setOpenSiri(true)
}

if(capTure){
 
  setInput(transcript)
  if (transcript.toLowerCase().trim().includes("send")) {
    console.log("Flex keyword detected!");
    setInput("")
    if(REP.current){
      REP.current.click();
    }
    resetTranscript("")
    setOpenSiri(false)

  
}

 else if(transcript.toLowerCase().trim().includes("delete")) {
  resetTranscript()
   setInput("")
   console.log(input)

 
 }


 


 
 
}
 

 



}, [transcript]); // Remove 'triggered' from dependency array


if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Your browser does not support speech recognition.</span>;
}


 
    // const classNameX  = (a,b,y)=>{
    //   if(b.senderId === TokenUser._id){
    //      return 'oneToOne'
    //   } else if(y?.includes("voice")){
    //     return 'SpecailVoice'
    //     // do other condtion here to solve this ussue 
    //   }
    //   else{
    //     return 'oneToneLeft'
    //   }
    // }

 
  return (
    <>  
 
 <div style={{position:"absolute",left:"50%",top:"50%",display:LoadingVoiceClose?"block":"none"}}>

 <Spinner color="pink.500" 
  size="lg"
 animationDuration="0.8s" />:

 </div>
    
 
 
 
   {/* <button  onClick={()=>handleStop()}>stop me </button>
    <br/>
    <button onClick={()=>handleManualStart()}>start</button>     */}
{ isLoadingForDeleltMessage &&     <div style={{position:"absolute",left:"50%",top:"50%"}}>    <Spinner color="blue"  size="lg"  /></div>
   }
   <div className='SiriFlex' style={{marginTop:"10px",display:openSiri?"flex":"none"}}>
<FlexSiri/>
</div>
    <div className='reallchat'>
   
      <div className='container--reallchat'>
        <div className='chatPage'>
        {progressBar &&    <Progress size='xs' colorScheme='blue' height='3.2px' isIndeterminate />
     }
          <div className='card-wrapp--acountx'>
            <div className='itemcards'>
              <Avatar   size='md' src={block?"":`${process.env.REACT_APP_API_KEY}/${currentUser[0].imgUser}`}>
                
                {block ? '' :  <AvatarBadge boxSize='18px'  bg={statusUser==='true' ? 'green.500' : 'red.500'} />}
              </Avatar>
              <div className='left--card-account1'>
                <h2 style={{ color: "white" }}> {block ? "User Flex"  : currentUser[0].username}</h2>
                {/* <p style={{ color: "grey" }}>@{currentUser[0]?.email}</p> */}
                <p style={{ color: "grey",display:"flex" }}>{stop=="Typing" && <> Typing <ThreePoint/>  </>} </p>

                {block ? <p style={{color:"white"}}>Block</p> :                 <p className='messageme' style={{ color: "white" ,display:statusUser==='true' && 'none'}} >Last seen {lastSeen} </p>}
              </div>
            </div>

            <div className='user-info-chat-block' style={{ color: "white",cursor:"pointer" }}>
              
             
               <div className='RioSetting' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"20px"}}>
               <img src="../butterfly (1).png" 
                onClick={()=>settemplate((prev)=>!prev)}
               style={{position:"relative",top:"10px",objectFit:"contain",width:"25px"}} alt=""/>
               <h1 onClick={()=>rio()}>...</h1>
               
               </div>

              <div style={{position:"absolute",zIndsex:"2"}}>
                <BlockUsers myId={TokenUser._id} matchID={currentUser[0]._id} passFunction  ={helpPassToBlockUserFunction}
                 test ={rayzen} testBlock = {block}
                 isOpen = {open}   asuss = {asus}
                />
              </div>
            </div>
          </div>

          <div
    className="scrennMessage"
    style={{
        color: "white",
        backgroundImage: `url(${Wallper})`,
        backgroundSize: 'cover', // Optional: to make the image cover the entire container
        backgroundPosition: 'center',
    }}
>
         <div >  { loadingMessages && <Progress size='xs' isIndeterminate />}  </div>
         
                  {messages.map(b=>
                
                   <>
                <div key={b._id} className={b.senderId===TokenUser._id  ? 'oneToneLeft' : 'oneToOne'} style={{cursor:"pointer"}}>
                   <div  style={{display:b.senderId===TokenUser._id && "flex",justifyContent:"flex-end"}}>
                   <Avatar   size='md' src={`${process.env.REACT_APP_API_KEY}/${b.imgProfile}`}   > 
                <AvatarBadge boxSize='18px' bg={statusUser==='true' ? 'green.500' : 'red.500'} />
              </Avatar> 
                   </div>
                    <h2  style={{fontWeight:"bold",display:"block",alignItems:"center",gap:"10px"}}> 
                  
                            <div>    

                      
                       <div className='content' style={{backgroundColor:"", height:"100%", width:"100%"   }}>  {b.content} </div> 

                       <p style={{ color: "black", fontSize: "16px", marginTop: "5px",overflowX:"auto" }}> 
                    

     


   {b?.imgUser?.includes("voice") && 
   
   <AudioPlayer 
    
   minimal={true}
   width={297}
   trackHeight={75}
   barWidth={1}
   gap={1}
   src={b?.imgUser}
   visualise={true}
   backgroundColor="#fff"
   barColor="#C1D0B5"
   barPlayedColor="#99A98F"
     
   skipDuration={2}
   showLoopOption={true}
   showVolumeControl={true}

    seekBarColor="#1877f2"
   volumeControlColor="blue"
   // hideSeekBar={true}
   // hideTrackKnobWhenPlaying={true}
 />

   }
 
       {b?.imgUser?.includes('.mp4') ? ( <video controls   style={{width: "100%"}}  > <source src={b.imgUser} type="video/mp4" /></video>) : ( b?.imgUser?.includes('image')  &&  <img src={b?.imgUser} alt='' className='contentimg' style={{borderRadius:"10px",cursor:'all-scroll'}}  onClick={()=>HandelSeeMessage(b)}/>  )}












                     
                      <div style={{display:"flex",justifyContent:"space-between"}}> 
                    <div>   {new Date(b.timestamp).getHours()} :
                      {new Date(b.timestamp).getMinutes().toString().padStart(2, '0')}</div>

                 
                       
                           <div>
                           {TokenUser._id==b.senderId &&  <h1   onClick={()=>HandelDelteMyMessages(b)}>  🗑️ </h1>}
                                  </div>
                     

                      </div>
                            </p>
                            </div>
                    
                        </h2>
                     
                     
                    
                     {/* <div>  
                    <Avatar   size='sm' src={`${b.imgUser}`}>
                           <AvatarBadge boxSize='10px' bg={currentUser[0].isOnline==='true' ? 'green.500' : 'red.500'} />
                            </Avatar>
                            </div> */}
                            
                            {/* <div className='ThreePart'  >
      <ThreePoint/>
    </div> */}
                  </div>

                    </>
                   
                )
                  }
                    <div ref={Useref}/>
                     
          </div>

        {!block?    <div className='submitMessages' style={{ display: "flex", alignItems: "center" }}>

          
       
       <label htmlFor="myfile" style={{color:"white"}}>
         
         <img src='https://cdn-icons-png.flaticon.com/256/6326/6326015.png'
         alt=''
         style={{width:"30px",height:"30px",objectFit:"cover",cursor:"pointer"}}
         />
         </label>       
       <input type="file" id="myfile" name="myfile" onChange={handleImageChange}/>
       {/* // this starttttttttttttttt */}
       <button
        style={{
          ...styles.button,
          ...(isRecordingActive ? styles.recordingButton : {}),
       
          width:"50px",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          borderRadius:"40px",
          padding:"10px",
          position:"relative",
          left:"4px"
        }}
        onClick={isRecordingActive ? stopRecording : startRecording}
      >
        {isRecordingActive ? (
          <SiriWave
            amplitude={2} // Controls the wave's height
            speed={0.2} // Controls the wave's animation speed
            color="#ff0077" // Sets the color of the wave
            width={28} // Width of the wave canvas
            height={28} // Height of the wave canvas
            style={{ margin: "0 auto" }}
          />
        ) : (
          <img src="../microphone.png" style={{width:"30px"}} alt=''/>
        )}
      </button>

      {(recordedAudioURL &&  VoiceMessageClose)   && (
        <div  style={{position:"absolute",bottom:"100px"}}>
          {/* <ReactAudioPlayer src={recordedAudioURL} autoPlay controls /> */}

          <AudioPlayer 
    
      minimal={true}
      width={350}
      trackHeight={75}
      barWidth={1}
      gap={1}
      src={recordedAudioURL}
      visualise={true}
      backgroundColor="#fff"
      barColor="#C1D0B5"
      barPlayedColor="#99A98F"
        
      skipDuration={2}
      showLoopOption={true}
      showVolumeControl={true}

       seekBarColor="#1877f2"
      volumeControlColor="blue"
      // hideSeekBar={true}
      // hideTrackKnobWhenPlaying={true}
    />


        </div>
      )}

    


      {
        helpAi ?      <input
        type='text'
         value={input}
        style={{ width: "80%", fontWeight: "bold", fontSize: "19px" ,border:"none",borderRadius:"17px",marginLeft:"10px",backgroundColor:"transparent",border:"1px solid grey",color:"grey"}}
        onClick={()=>{HadndelTyping() 
          sethelpAi(false)
        }}
        onBlur={()=>HandelCloseTyping()}
        onKeyPress={handleKeyPress}
        ref={StoreMessages}
      />

      :

      <input
      type='text'
   
      style={{ width: "80%", fontWeight: "bold", fontSize: "19px" ,border:"none",borderRadius:"17px",marginLeft:"10px",backgroundColor:"transparent",border:"1px solid grey",color:"grey"}}
      onClick={()=>HadndelTyping()}
      onBlur={()=>HandelCloseTyping()}
      onKeyPress={handleKeyPress}
      ref={StoreMessages}
      placeholder={`Type something mr ${TokenUser.username}`}

    />
      }



         {/* <Button
           isLoading={loading}
           style={{ backgroundColor: "white", width: "80px", height: "45px", cursor: "pointer", marginLeft: "10px", fontWeight: 'bold', borderRadius: "100px" }}
           onClick={()=>{ HandelChunk()}}
        ref={REP}
         >
           SEND
         </Button> */}

<div style={{width: "70px",display:"flex",justifyContent:"center",alignItems:"center"}}>
{
  loading ?  <Spinner color="blue.500" animationDuration="0.8s" />:
  
<button   ref={REP}   onClick={()=>{ HandelChunk()}} >
<img src={sendIcon} alt="" style={{width:"40px",height:"40px",objectFit:"cover"}}/>
</button>
}
</div>
         
       </div> :<div className='blockConainter' style={{textAlign:"center"}} >
        <hr/>
        <p style={{color:"grey"}}>Tout le monde ne peut pas envoyer de message a ce compte </p>
        </div>}
        </div>
      </div>
    </div>
    <div className='containerSeeTheCurrentImages' style={{display:currentRealOpen?"block":"none"}} >
      <div className='containeraddxsrgr' style={{display:currentRealOpen ? 'flex':"none"}}
      onClick={()=>{setcurrenRealOpen(false)
        HadndelTyping()}
      }
      
      ><svg
  xmlns="http://www.w3.org/2000/svg"
  height="24"
  width="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 6h18"></path>
  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  <path d="M4 6v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6"></path>
  <path d="M10 11v6"></path>
  <path d="M14 11v6"></path>
</svg>
</div>

<div className='currentImg' ><img src={currentPictuer && currentPictuer[0]?.imgUser} alt=''/></div>
   
    
    </div>
    
    
    <div className='coiseClor' style={{display:template?"none":"flex",flexDirection:template&&"column"}}>
       <div className='offSection' onClick={()=>settemplate(true)} > X</div>
      {arr.map((item)=>  
      <div className='wallper1' style={{cursor:"pointer"}}> <img src={item.LinkImg} onClick={()=>{
        // setwalpper(item.LinkImg) 
        //   settemplate(true)

          sendRquestThemeToDataBase(item.LinkImg)
          
        }}/>
      </div>)}
      
      
    </div>

    </>
  )
}

export default ReallChat
