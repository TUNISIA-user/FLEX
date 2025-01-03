import React, { useEffect, useState } from 'react';
import './Admin.css';
import axios from './axios';
import Card from './Card';
import { useGlobalContext } from '../Store/GlobalContext';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
 
const Admin = () => {
    const [messages, setMessages] = useState([]);
    const { dispatch, BasketMassages, userTage, TokenUser } = useGlobalContext();
    const [document, setDocument] = useState('');
    // intial comment for compilr 
    const FetchDataFromArray = async () => {
        try {
            const response = await axios.get('/getChatPostForAdmin');
            setMessages(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(`Issue fetching data: ${error}`);
        }
    };

   useEffect(() => {
        
      
           FetchDataFromArray();
     
   }, []);


//    useEffect(() => {
        
//     setInterval(() => {
//         FetchDataFromArray();
//     }, 1000);
// }, []);


    const HandleSendMessageForTheUserReact = async () => {
        if (!document.trim()) {
            alert('Message cannot be empty!');
            return;
        }

        const newMessage = {
            textQuestion: "", // Assuming no question from admin
            id: "",
            name: "admin",
            answerUser: document,
            rept: "AdminUser",
        };
 // fix this cheat in other day 
        try {
            // Update the database                              // i thnik id each one has a session
            const response = await axios.put(`/ChatSession/66f771bc66699b7f34390f25`, {
                PrivateSession: [newMessage],
            });

            if (response) {
                // Add the new message to the front-end state immediately
                const updatedMessages = [...BasketMassages.flat(), newMessage];

                // Dispatch updated messages to the global context
                dispatch({
                    type: 'MESSAGES',
                    payload: updatedMessages,
                });

                setDocument(''); // Clear the input field
                alert('Message sent successfully!');
            }
        } catch (error) {
            console.log(`Error sending message: ${error}`);
        }
    };
                                                                                                       
    return (
        <div className='Admin' style={{display:TokenUser?.username==="admin" || TokenUser?.username==="devlopper"? "flex" : "none"}} >
            <div className='Container__admin'>
                <div className='right'  >
                    {messages.map((item) => (

                        <Card key={item._id} cardItem={item} allMessage={messages} 
                        
                        />
                    ))}
                </div>

                <div className='left'>
                    <div className='ContainerChat'>
                        <div className='ContainerName'>G</div>
                        {/* <div className='ContainerNamec' style={{ color: 'white' }}>N</div> */}
                    </div>
                    <hr />
                    <div className='MessageaAdminRouetes'>
                        {BasketMassages[0]?.map((item) => (
                            <div className={item.rept === 'AdminUser' ? 'righINdex' : 'message'}
                            style={{ display: item.textQuestion === '..' && 'none' }}
                            >
                                
                                <span  >
                                 {item.rept === 'AdminUser'? "" : 'Question : ' }     {item.textQuestion}
                                </span>

                    <span   >
                         

                        {item.rept === 'AdminUser'? "" : ' Answer:  ' }
                        <div
    style={{
        
        height: "100px",       // Adjust height as needed
        overflowY: "auto",     // Enable vertical scrolling
        width: "100%",         // Full width of its parent container
        padding: "10px",      // Padding around the content
        boxSizing: "border-box", // Ensure padding is included in width/height
    }}
>
      <BlockMath
        math={String.raw`${item.answerUser}`}
        // Additional styling for BlockMath if needed
        // style={{ maxWidth: "100%" }}
    />  
 
</div> 
                        </span>  
                        
                                        
   <span>{new Date(item.createdAt).getHours()} :     <span>{new Date(item.createdAt).getMinutes()}</span>  [<span>{new Date(item.createdAt).toLocaleDateString()}]</span> </span>
                                
                            </div>
                        ))}
                    </div>

                 

                    <div className='sendiy'>
                        <input
                            type='text'
                            value={document}
                            onChange={(e) => setDocument(e.target.value)}
                            placeholder='Type your message...'
                        />
                        <button
                            onClick={HandleSendMessageForTheUserReact}
                            style={{ cursor: 'pointer' }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
