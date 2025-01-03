// import React, { useState, useRef } from "react";
// import axios from "axios";
// import ReactAudioPlayer from "react-audio-player";
// import SiriWave from "react-siriwave";
// import { useGlobalContext } from "../Store/GlobalContext";
// function AudioRecorder() {
//   const [y, setIsRecordingActive] = useState(false);
//   const [recordedAudioURL, setRecordedAudioURL] = useState("");
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);

//   const streamRef = useRef(null);
//   const {dispatch} = useGlobalContext()

//   const startRecording = async () => {
   
//     setIsRecordingActive(true);
//     audioChunksRef.current = [];

//     // Request audio stream and store in ref
//     streamRef.current = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//     });
//     mediaRecorderRef.current = new MediaRecorder(streamRef.current);

//     mediaRecorderRef.current.ondataavailable = (event) => {
//       audioChunksRef.current.push(event.data);
//     };

//     mediaRecorderRef.current.onstop = async () => {
//       const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
//       const formData = new FormData();
//       formData.append("file", audioBlob);
//       formData.append("upload_preset", "ask-app"); // Set your Cloudinary upload preset here

//       try {
//         const response = await axios.post(
//           `https://api.cloudinary.com/v1_1/dfmdgsiid/upload`,
//           formData
//         );
//         setRecordedAudioURL(response.data.secure_url);
//         console.log("Audio uploaded:", response.data.secure_url);
//       } catch (error) {
//         console.error("Error uploading audio:", error);
//       }
//     };

//     mediaRecorderRef.current.start();
//   };

//   const stopRecording = () => {
    
//     setIsRecordingActive(false);
//     mediaRecorderRef?.current?.stop();

//     // Stop all tracks to release the microphone
//     streamRef.current.getTracks().forEach((track) => track.stop());
//   };

//   const styles = {
//     container: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "20px",
//       border: "2px solid #007bff",
//       borderRadius: "10px",
//       backgroundColor: "#f8f9fa",
//       width: "300px",
//       margin: "auto",
//       boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     },
//     button: {
//       padding: "10px 20px",
//       fontSize: "16px",
//       color: "white",
//       backgroundColor: "#007bff",
//       border: "none",
//       borderRadius: "5px",
//       cursor: "pointer",
//       transition: "background-color 0.3s",
//     },
//     recordingButton: {
//       backgroundColor: "#dc3545", // Red color when recording
//     },
//     audioPlayer: {
//       marginTop: "20px",
//       textAlign: "center",
//     },
//     heading: {
//       marginBottom: "10px",
//       fontWeight: "normal",
//       color: "#333",
//     },
//   };

 
  
//   return (
//     <>

    
  
//     <div style={styles.container}>
//       <button
//         style={{
//           ...styles.button,
//           ...(isRecordingActive ? styles.recordingButton : {}),
//         }}
//         onClick={isRecordingActive ? stopRecording : startRecording}
//       >
//         {isRecordingActive ? (
//           <SiriWave
//             amplitude={2} // Controls the wave's height
//             speed={0.2} // Controls the wave's animation speed
//             color="#ff0077" // Sets the color of the wave
//             width={40} // Width of the wave canvas
//             height={40} // Height of the wave canvas
//             style={{ margin: "0 auto" }}
//           />
//         ) : (
//           "Start Recording"
//         )}
//       </button>

//       {recordedAudioURL && (
//         <div style={styles.audioPlayer}>
//           <ReactAudioPlayer src={recordedAudioURL} autoPlay controls />
//         </div>
//       )}
//     </div>

//     </>

//   );
// }

// export default AudioRecorder;
