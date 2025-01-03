import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './TextAreaSection.css'; 
import axios from './axios'; 
import { useGlobalContext } from '../Store/GlobalContext';

const TextAreaSection = () => {
  const [latexCode, setLatexCode] = useState('E = mc^2');
  const [answer, setAnswer] = useState('');
  const { TokenUser, AddQuestion,dispatch } = useGlobalContext();

  // Start Conversation with Admin
  const startConversation = async () => {
    try {
      // Check if session exists

      const newData = {
        ...TokenUser,
        chatWithAdmin1:true
      }
      console.log(newData)
        dispatch({
          type:"ADD__NEW__USER",
          payload : newData 
        })
         


        
      const checkResponse = await axios.put(`/check/${TokenUser._id}`);
      console.log(checkResponse, "checkResponse");

        // here should be do logique if i click the butonn Update chatWithAdmj
      



      // If no existing session, create a new one
      const sessionResponse = await axios.post("/ChatSession", {
        idSession: TokenUser._id,
        nameidSession: TokenUser.username,
        PrivateSession: [
          {
            textQuestion: "..",
            id: "..",
            name: "..",
            answerUser: "..",
            rept: "null",
            statusSession: true,
          },
        ],
      });

      sessionResponse
        ? alert("Data sent to the database")
        : alert("No response from the server");
    } catch (error) {
      console.error(`Error occurred: ${error}`);
    }
  };

  // Handle Submit
  const handleSubmit = async () => {
    setAnswer(latexCode);
    console.log(latexCode);

    try {
      const adminResponse = await axios.put(`/Admins/66e79f301641b10bbfecd53c`, {
        commentsFromAdmin: [
          {
            textQuestion: AddQuestion.question.text,
            id: TokenUser._id,
            name: TokenUser.username,
            answerUser: latexCode,
            rept: 'normalUser',
          },
        ],
      });

      adminResponse && alert("Data sent successfully to Admin");

      const sessionResponse = await axios.put(`/ChatSession/${TokenUser._id}`, {
        PrivateSession: [
          {
            textQuestion: AddQuestion.question.text,
            id: TokenUser._id,
            name: TokenUser.username,
            answerUser: latexCode,
            rept: "normalUser",
          },
        ],
      });

      sessionResponse && alert("Session updated successfully");
      sessionResponse && setLatexCode("");
    } catch (error) {
      console.log(`Error occurred: ${error}`);
    }
  };

  return (
    <div className="latex-renderer"  >
      <h1 style={{display:TokenUser.chatWithAdmin1?"block":"none"}}>LaTeX to HTML Converter</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder="Type LaTeX code here..."
        value={latexCode}
        onChange={(e) => setLatexCode(e.target.value)}
        style={{display:TokenUser.chatWithAdmin1?"block":"none"}}
      />
      <br />
      <div className='ContainersumbitButtonDesigned'>
        {TokenUser && !TokenUser.chatWithAdmin1 ? (
          <button
            className='sumbitButtonDesigned'
            onClick={startConversation}
            style={{ cursor: "pointer", display: "flex" }}
          >
            Start conversation with admin
          </button>
        ) : (
          <button
            className='sumbitButtonDesigned'
            onClick={handleSubmit}
            style={{ cursor: "pointer", display: "flex",color:"white",justifyContent:"center" }}
          >
            Submit Answer
          </button>
        )}
        <p style={{display:TokenUser.chatWithAdmin1?"block":"none"}}>Here should be img</p>
      </div>
      
      {latexCode && (
        <div style={{display:TokenUser.chatWithAdmin1?"block":"none"}}>
          <BlockMath math={latexCode} />
        </div>
      )}
    </div>
  );
};

export default TextAreaSection;
