// import React, { useEffect, useState } from 'react';

// const WebSocketTest = () => {
//     const [messages, setMessages] = useState([]); // State to store incoming messages
//     const [socket, setSocket] = useState(null);
//     const [videoTitle, setVideoTitle] = useState(''); // State to hold video title input
//     const [videoUrl, setVideoUrl] = useState(''); // State to hold video URL input

//     useEffect(() => {
//         // Create a WebSocket connection to the server
//         const ws = new WebSocket('ws://localhost:9000');

//         // Store the WebSocket instance in state
//         setSocket(ws);

//         // Handle WebSocket connection open event
//         ws.addEventListener('open', () => {
//             console.log('Connected to WebSocket server');
//         });

//         // Handle incoming WebSocket messages
//         ws.addEventListener('message', (event) => {
//             try {
//                 const data = JSON.parse(event.data);
//                 if (data.type === 'newVideo') {
//                     // Append the new video message to the messages array
//                     setMessages((prevMessages) => [...prevMessages, data.video]);
//                 }
//             } catch (error) {
//                 console.error('Error parsing WebSocket message:', error);
//             }
//         });

//         // Handle WebSocket connection close event
//         ws.addEventListener('close', () => {
//             console.log('Disconnected from WebSocket server');
//         });

//         // Cleanup WebSocket connection on component unmount
//         return () => {
//             ws.close();
//         };
//     }, []);

//     // Function to send video data to the server via WebSocket
//     const sendVideo = async () => {
//         if (socket && socket.readyState === WebSocket.OPEN) {
//             const videoData = {
//                 type: 'newVideo',
//                 video: {
//                     username: "GhaithNhadi 🎉🎉", // Example username
//                     email: "nahdigyth@example.com", // Example email
//                     myimg: "https://example.com/profile.jpg", // Example profile image URL
//                     title: videoTitle || "Default Title", // Video title from input
//                     videoContent: videoUrl || "https://example.com/video.mp4", // Video URL from input
//                 },
//             };
//             // Send video data to the server
//             socket.send(JSON.stringify(videoData));
//             console.log('Video sent:', videoData);
//             setMessages(videoData.video)
//             console.log(messages,"dd")
//         } else {
//             console.error('WebSocket is not open. Unable to send video.');
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <input
//                     type="text"
//                     placeholder="Video Title"
//                     value={videoTitle}
//                     onChange={(e) => setVideoTitle(e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Video URL"
//                     value={videoUrl}
//                     onChange={(e) => setVideoUrl(e.target.value)}
//                 />
//                 <button onClick={sendVideo}>Send Video</button>
//             </div>

//             {/* Display received messages */}
//           {messages.length>0 && messages?.map((item)=><p>{item.username}</p>)}
//         </div>
//     );
// };

// export default WebSocketTest;





