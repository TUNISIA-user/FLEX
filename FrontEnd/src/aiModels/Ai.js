import "regenerator-runtime/runtime"; 
import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useGlobalContext } from "../Store/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Divider, position, useToast } from '@chakra-ui/react'
import "./Ai.css"
 

    const keyframes = `
@keyframes pulse {
    0% {
        background-color: red;
        transform: scale(1);
    }
    50% {
        background-color: darkred;
        transform: scale(1.1);
    }
    100% {
        background-color: red;
        transform: scale(1);
    }
}
`;
    const Ai = () => {
   

        const {SiriVoice,dispatch} = useGlobalContext()
        
    //     const SET_SIRI_True = ()=>{
           
    //         dispatch({type:"SET_SIRI_VOICE",paySiri:true}) // this to ative siri
    //         console.log(SiriVoice)
    //     }
    //    const SET_SIRI_False = ()=>{
           
    //        dispatch({type:"SET_SIRI_VOICE",paySiri:false}) // this to close siri 
    //        console.log(SiriVoice)
    //    }

 
  


        const [cloSeCard,setCloseCard] = useState(true);
        const [isListeningx, setListe] = useState(true);

        const CloseCard = ()=>{
            setCloseCard((prev)=>!prev)
        }

      

  // this for listene poeple 

    
      const { transcript, resetTranscript } = useSpeechRecognition();
      const [isListening, setIsListening] = useState(false);
      const [triggered, setTriggered] = useState(false); // Track if keyword is triggered
       const [voiceCommand, setVoiceCommand] = useState("");
       const toast = useToast()
       const Nav = useNavigate();
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

//     // Monitor the transcript for the trigger phrase "Hello Flex"
  useEffect(() => {
     console.log("Live Transcript:", transcript); // Debug: Check transcript in real-time

//     // Check if the trigger word "flex" is mentioned
      if (transcript.toLowerCase().trim().includes("flex")) {
          console.log("Flex keyword detected!");
          // can i here add song ? 
          resetTranscript()
          dispatch({type:"SET_SIRI_VOICE",paySiri:true})
//         // Show toast notification
         setCloseCard(false)
      }


      if (transcript.toLowerCase().trim().includes("delete")) {
        
        resetTranscript()
//      
    }


//     // Check for various commands
     if (transcript.toLowerCase().trim().includes("home")) {
         console.log("Navigating to Home...");
         Nav("/bluskG"); // Navigate to home
         setCloseCard(true)
         resetTranscript("")
         dispatch({type:"SET_SIRI_VOICE",paySiri:false})
    } else if (transcript.toLowerCase().trim().includes("about")) {
        toast({
            title: 'Hello!',
            description: "We are listening to you. You can talk in this app.",
            status: "info",
            duration: 2000,
            isClosable: true,
        });
        Nav("/about"); // Navigate to about
    } else if (transcript.toLowerCase().trim().includes("contact")) {
        console.log("Navigating to Contact Page...");
        Nav("/blsuky/Youtube"); // Navigate to contact
    } 
    

    else if (transcript.toLowerCase().trim().includes("chat")) {
        console.log("Navigating to Contact Page...");
        Nav("/bluskG/freind"); // Navigate to contact
    } 
    


   

    else if (transcript.toLowerCase().trim().includes("close")) {
        console.log("Navigating to Contact Page...");
        setCloseCard(true)
    } 

//     // No need to stop the listening; just continue to listen for more commands
  }, [transcript]); // Remove 'triggered' from dependency array

      const handleManualStart = () => {
          SpeechRecognition.startListening({ continuous: true });
          setIsListening(true);
      };

      if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
          return <span>Your browser does not support speech recognition.</span>;
      }


const styles = {
    container: {
      textAlign: "center",
      marginTop: "50px",
      
      display:"flex",
      justifyContent:"center"
       
    },
    button: {
      border: "none",
      borderRadius: "50%", // Circular shape
      width: "70px",
      height: "70px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "background-color 0.3s", // Smooth transition for hover effect
      animation: isListening ? "pulse 1s infinite" : "none", // Apply animation if listening
    },
    icon: {
      fontSize: "30px",
      color: "white", // Icon color
    },
    statusMessage: {
      marginTop: "20px",
      fontSize: "18px",
      color: "#333", // Status text color
    },
  };
// here logiqe open card 


    return (
        
        <>
        <div>
        {/* <p>Transcript: {transcript}</p>
       
        {/* <span
            className="material-symbols-outlined"
            style={{ cursor: "pointer" }}
            onClick={handleManualStart}
        >
            mic
        </span> */}
        </div> 
        <div className="AiVoice" style={{display:cloSeCard?"none":"block"}}>
         <div className="Close"  style={{width:"100%",display:"flex",justifyContent:"flex-end",cursor: "pointer"}}
         onClick={()=>{CloseCard()
            dispatch({type:"SET_SIRI_VOICE",paySiri:false})
         }}>X</div>
         <div className="containerworld" style={{width:"100%",height:"220px",overflow:"auto"

            
         }}>
       
         <p style={{color:"white"}}>  {transcript}</p>

         </div>

         
         <div style={styles.container}>
      <style>{keyframes}</style> {/* Inject keyframes into the document */}
      <button
        style={{
          ...styles.button,
          backgroundColor: isListeningx && "red",
        }}
      >
        <span style={styles.icon}>🎤</span>
      </button>
    </div>


        </div>

 
        </>

    );
    };

    export default Ai;
