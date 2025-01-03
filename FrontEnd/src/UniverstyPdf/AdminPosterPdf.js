import React, { useEffect, useState } from 'react';
import axios from "../Component/axios";
import { FaFileUpload } from 'react-icons/fa'; // Import icon
import { Avatar, Spinner,Stack } from '@chakra-ui/react'; // Remove unused import (useUpdateEffect)
import { Input } from '@chakra-ui/react'
import { useGlobalContext } from '../Store/GlobalContext';
import "./AdminPosterPdf.css"

const AdminPosterPdf = () => {
  const [pdfUrl, setPdfUrl] = useState(''); // State to store PDF URL
  const [selectedFile, setSelectedFile] = useState(null); // State to store selected file
  const [message, setMessage] = useState(''); // Message to show upload status
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(false);
  const [getAllPdf, setGetAllPdf] = useState([]); // Store all PDFs
  const {TokenUser} = useGlobalContext()
  // Handle file selection
  
  const [again,setagain] = useState(null)


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  // Handle PDF upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a PDF to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/upload`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
    
      setLoading(false);
     setagain ((prev)=>!prev)
      if (response.data) {
        setPdfUrl(response.data.fileUrl);
        uploadToMuler(response.data.fileUrl);
     
      } else {
        alert('Your PDF is not working, please try again.');
      }
     
    } catch (error) {
      console.error('Upload error:', error);
      setLoading(false);
    }
  
  };

  // Upload PDF metadata to the server
  const uploadToMuler = async (fileUrl) => {
    setLoading(true);
    try {
      await axios.post('/uplod/pdf/busky', {
        groupName: groupName.length > 0 ? groupName : 'No Group',
        LinkkPdf: fileUrl,
      });
      setLoading(false);
    } catch (error) {
      console.error('Muler upload error:', error);
      setLoading(false);
    }
  };

  // Fetch all PDFs from the server
  const fetchAllPdfs = async () => {
    try {
      const { data } = await axios.get('/all/pdf');
      setGetAllPdf(data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  useEffect(() => {
    fetchAllPdfs();
  }, [again]);

  // Load PDFs on component mount
  useEffect(() => {
    fetchAllPdfs();
  }, []);

  

  return (
    <div style={{ backgroundColor: '#1a202c', color: 'white', height: '100vh' }}>
      <div className='func'>
  


   <div className='createviety'>

   <Avatar style={{marginRight:"19px",marginTop:"10px"}} src='https://bit.ly/dan-abramov' size="sm" />


   <Stack spacing={3}>
     <Input focusBorderColor='lime' 
       className='jj'
        style={{width: "300px"}}
     placeholder={`POST YOUR PDF MR 
      ${TokenUser.username}`} 
      onChange={(e)=>setGroupName(e.target.value)}
      />
      
   
    
   </Stack>


   </div>
  



        <label
          htmlFor="pdf-upload"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center',marginLeft:"10px",marginTop:"10px" }}
        >
          <FaFileUpload size={24} color="gray" style={{ marginRight: '5px' }} />
          <span>Select PDF</span>
        </label>

        <input
          type="file"
          id="pdf-upload"
          accept="application/pdf"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {loading ? (
          <Spinner color="red.500" />
        ) : (
          <button onClick={handleUpload} style={{ marginLeft: '10px' }} >
            Upload PDF
          </button >
        )}

        <div className="allPdf"></div>
      </div>

      <div
        className="app-bluskyapp"
        style={{
          backgroundColor: 'tra',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:"20px"
        }}
      >
        {getAllPdf.map((item) => (
          <div key={item.LinkkPdf} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <div className='innerInfo0' style={{width:"340px",display:"flex",backgroundColor:"red",alignItems:"center",justifyContent:"center"}}>
             
            <Avatar style={{marginRight:"19px",marginTop:"3px"}} src='https://bit.ly/dan-abramov' size="sm" />
            <h1>{item.groupName}</h1>
            </div>
            <iframe
              src={`${process.env.REACT_APP_API_KEY}${item.LinkkPdf}`}
              width="360px"
              height="360px"
              title="PDF Viewer"
              style={{ borderRadius: '30px', marginTop: '10px' }}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPosterPdf;
