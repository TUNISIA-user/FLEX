import React, { PureComponent, useState } from "react";
import './CommentSection.css';
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { useGlobalContext } from "../Store/GlobalContext";

const CommentSection = ({ b }) => {
    const [likeCount, setLikeCount] = useState(14);
    const {TokenUser} =  useGlobalContext()
    console.log(TokenUser)
    let x =b.imgComment
    const PathImgUrl = x?.replace(/\\/g, '/')

    const handleLike = () => {
        setLikeCount(likeCount + 1);
    };

    const timestamp = b.createdAt;
    const date = new Date(timestamp);

    // Extracting the specific date
    const specificDate = date.toISOString().split('T')[0];

    // Extracting hours, minutes, and seconds
    const time = date.toISOString().split('T')[1].split('.')[0];

    console.log(`Date: ${specificDate}`);
    console.log(`Time: ${time}`); // Output: "HH:MM:SS"
      const sampleLatex = "$\\int_{1}^{2} x^3 \\, dx$"; // Ensure correct escaping

    return (
        <div className="card">
            <span className="title">Comments 
                <div className="parrametter" style={{position:"absolute",right:"0px",display:"flex",flexDirection:"row",gap:"30px",alignItems:"center"}}>  
                    
                <img  src="trash.png" style={{width:"30px",cursor:"pointer"}}/>
                <img  src="edit.png" style={{width:"30px",cursor:"pointer"}}/>
                
                  </div>  
 
                
                </span>
            
            <div className="comments">
                <div className="comment-react">
                    <button onClick={handleLike}>
                        <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="#707277"
                                strokeLinecap="round"
                                strokeWidth="2"
                                stroke="#707277"
                                d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
                            ></path>
                        </svg>
                    </button>
                    <hr />
                    <span>{likeCount}</span>
                </div>
                <div className="comment-container">
                    <div className="user">
                        <div className="user-pic">
                            <img src={`${process.env.REACT_APP_API_KEY}/${b.ProfileImg}`} alt=""/>
                        </div>
                        <div className="user-info">
                            <span>{b.UsernameComment}</span>
                            <p>{specificDate} : {time}</p>
                        </div>
                    </div>
                    <p className="comment-content">
                        <pre>   {b.comment}    </pre>
                    
                     {/* <pre>  
                        <Latex > 
                           {sampleLatex}z
                        </Latex>
                        </pre>
                        */}
                        <br/><br/>
                        {b.imgComment && (
                            <div className="comment-image">
                                <img src={`${process.env.REACT_APP_API_KEY}/${PathImgUrl}`} alt="Comment" /> 
                            </div>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
