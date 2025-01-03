import React, { useState } from 'react';
import './PutComment.css';
import EmojiPicker from 'emoji-picker-react';
import axios from '../Component/axios'; // Ensure you import axios correctly
import { useGlobalContext } from '../Store/GlobalContext';

const PutComment = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [Comment, setCommentUser] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const { AddQuestion, TokenUser, dispatch } = useGlobalContext();
    const [own, setown] = useState("");

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSendDataFromReply = async (e) => {
        e.preventDefault();
        setCommentUser("");
        setown("");
        dispatch({
            type: "ADD__TOOGLE",
            toogle: true
        });

        const formData = new FormData();
        formData.append('id', TokenUser._id); // Append user ID
        formData.append('CommentText', Comment); // Append comment text
        formData.append('UsernameComment', TokenUser.username); // Append username
        formData.append('image', selectedFile || own); // Append the file or a link
        formData.append('ProfileImg',TokenUser.imgUser)
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_KEY}/test-upload/${AddQuestion._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log("Comment and image uploaded successfully");
                // Handle successful update, e.g., show a message or refresh data
            }
        } catch (error) {
            console.error(`This error occurred: ${error}`);
            // Handle the error
        }

        dispatch({
            type: "ADD__TOOGLE",
            toogle: false
        });
    };

    return (
        <form className="text-box">
            <div className="box-container">
                <textarea
                    placeholder="Reply"
                    required
                    value={Comment}
                    style={{color:"black"}}
                    onChange={(e) => setCommentUser(e.target.value)}
                ></textarea>
                <div className="formatting">
                    <span
                        className="material-symbols-outlined"
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsOpen(prev => !prev)}
                    >
                        sentiment_satisfied
                    </span>

                    <div className='EmojiFpramting'>
                        <div className='EmojiFpramtingx'>
                            <EmojiPicker height={350}  open={isOpen} onEmojiClick={(e) => setCommentUser(prev => prev + e.emoji)} />
                        </div>
                         {/* <input type='file' onChange={handleFileChange}  />   */}
               <div className='container--file--Upload--Join'>   
                         <label className="custom-file-upload" style={{marginLeft:'50px'}}>
                                <input type="file" onChange={handleFileChange} />
                                <span className="upload-icon">📁</span> Choose Pictuer
                            </label>


                         <div className='containerDispalyImage'>   
                        {selectedFile && (
                            <img 
                                src={URL.createObjectURL(selectedFile)} 
                                alt="Selected file preview" 
                                
                            />
                        )}
                    </div>
                    </div>
                    </div>
                    <button className="send" title="Send" onClick={handleSendDataFromReply}>
                        <svg fill="none" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                stroke="#ffffff"
                                d="M12 5L12 20"
                            ></path>
                            <path
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                stroke="#ffffff"
                                d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PutComment;
