import React, { useState } from 'react';
import './Login.css';
import axios from './axios'; // Your custom axios instance
import { useGlobalContext } from '../Store/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { useToast, Spinner } from '@chakra-ui/react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();
  const toast = useToast();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUserPush = async () => {
    if (!username || !email || !password || !selectedFile) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields and upload an image.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoadingLogin(true);

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'ask-app'); // Replace with your Cloudinary upload preset
   
      const uploadResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dfmdgsiid/upload', // Replace with your Cloudinary upload URL
        formData
      );

      const imageUrl = uploadResponse.data.secure_url;
     console.log(imageUrl,"current")
      // Send user data along with Cloudinary URL to backend
      const response = await axios.post('/setUserWithAnswer', {
        username,
        email,
        password,
        imgUser: imageUrl, // Cloudinary URL
      });

      // Handle successful response
      if (response) {
        toast({
          title: 'Account created.',
          description: "We've created your account successfully.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        dispatch({
          type: 'ADD__NEW__USER',
          payload: response.data,
        });

        navigate('/Headers');
      }
    } catch (error) {
      console.error('Error uploading or creating user:', error);
      toast({
        title: 'Error',
        description: 'Failed to create account. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoadingLogin(false);
    }
  };

  return (
    <div className="formtadataSection" style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="Form">
        <div className="containerdes">Welcome to our web app! We love you, don't forget this :)</div>

        <label htmlFor="avatar">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/OneDrive_Folder_Icon.svg/2048px-OneDrive_Folder_Icon.svg.png"
            width="40px"
            height="40px"
            style={{ cursor: 'pointer' }}
            alt="Upload"
          />
        </label>

        <input
          style={{ display: 'none' }}
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={handleFileChange}
        />

        <br />
        <input
          type="text"
          value={username}
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="text"
          value={email}
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          value={password}
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        {isLoadingLogin ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner
              thickness="3px"
              speed="0.5s"
              emptyColor="gray.200"
              color="blue.500"
              size="md"
            />
          </div>
        ) : (
          <button onClick={handleUserPush}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Login;
