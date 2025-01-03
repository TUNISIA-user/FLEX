import React, { useState } from 'react';
import axios from './axios';
import "./imageUpload.css";
import { useToast } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useGlobalContext } from '../Store/GlobalContext';
const ImageUpload = () => {
  // State for the form inputs
  const toast = useToast()
  const {TokenUser} = useGlobalContext()

  const [questionText, setQuestionText] = useState('');
  const [description, setDescription] = useState('');
  const [imgItem, setImgItem] = useState(null);
  const [typQuestion, setTypQuestion] = useState('');
  const [loading,setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    // Prepare the form data for image upload
    const formData = new FormData();
    formData.append("file", imgItem);
    formData.append("upload_preset", 'ask-app'); // Replace with your Cloudinary upload preset

    try {
      // Upload the image to Cloudinary
      const uploadResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dfmdgsiid/upload', // Replace with your Cloudinary cloud name
        formData
      );

    
      const question = {
        text: questionText,
        description: description,
        imgItem: uploadResponse.data.secure_url,
        //here should be img user i wannna pass it  
        // dont forget this 
        // and all peaople can caess this and create button delte just fo the ownser 
      };

      const finalData = {
        question: question,
        TypQuestion: typQuestion,
      };

     
      console.log(finalData)
     const reponse = await axios.post('/postQuestion', finalData);
     
      
      toast({
        title: 'Question created.',
        description: "Your Question awsome created",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setLoading(false)



    } catch (error) {
      console.error('Error uploading image or submitting question:', error);
      toast({
        title: 'Somehting when wrong ',
        description: "Check if you have post Pictuer",
        status: 'warning',
        duration: 9000,
        isClosable: true,
      })
       setLoading(false)

    }
  };

  return (
    <>
    {/* display:TokenUser?.username==="admin" || TokenUser?.username==="devlopper"? "flex":"none" */}
    <div className='HandelSumbit' style={{backgroundColor:"#0E1217"}}>  
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <textarea 
            type="text" 
            placeholder="Enter question text" 
            value={questionText} 
            onChange={(e) => setQuestionText(e.target.value)} 
            
          />
        </div>
        <div>
          <textarea 
            placeholder="Enter question description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            
          />
        </div>
        <div>
           <label htmlFor="myfile" style={{color:"white"}}>
            
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/OneDrive_Folder_Icon.svg/2048px-OneDrive_Folder_Icon.svg.png'
            alt=''
            style={{width:"30px",height:"30px",objectFit:"cover",cursor:"pointer"}}
            />
            </label>       
          <input type="file" id="myfile" name="myfile"
          
         
          onChange={(e) => setImgItem(e.target.files[0])} 
          
          /> 
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Enter question type" 
            value={typQuestion} 
            onChange={(e) => setTypQuestion(e.target.value)} 
             
          />
        </div>
        {/* <button type="submit">Submit</button>
 */}

        <Button
    type="submit"
    isLoading={loading}
    loadingText={loading ?  'Send it ... ' :"EROOR"}
    colorScheme='#0056b3'
    variant='outline'
  >
    Send 
  </Button>

      </form>

      </div>
    </>
  );
};

export default ImageUpload;
