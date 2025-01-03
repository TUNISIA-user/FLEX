import React, { useState } from 'react';
import './Auth.css';
import { useGlobalContext } from '../Store/GlobalContext';
import axios from './axios'; // Assuming axios is configured with baseURL
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { dispatch } = useGlobalContext(); // Example for global dispatch (context)
  const [open,setOpen] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/auth/${email}`);
      console.log(response.data, 'current data');

      dispatch({
        type: 'ADD__NEW__USER',
        payload: {
          email: response.data[0].email,
          imgUser: response.data[0].imgUser,
          myQuestionsBasket: response.data[0].myQuestionsBasket.length > 0 ? response.data[0].myQuestionsBasket : [],
          password: response.data[0].password,
          receiveMessages: response.data[0].receiveMessages.length > 0 ? response.data[0].receiveMessages : [],
          username: response.data[0].username,
          chatWithAdmin1 : response.data[0].chatWithAdmin1,
          _id: response.data[0]._id,
          isonline : response.data[0].isonline,
          LastSeen : response.data[0].LastSeen
        },
      });

      // Navigate after successful login
      navigate("/Headers");
       
    } catch (error) {
      // console.error(`This error occurred: ${error}`);
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
 
 

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          placeholder="Type your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="auth-input"
        />

    <div className='alter'>

    <input
          type={open ? "txt" : "password"}
          placeholder="Type your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
          className="auth-input"
        />
       
    
 
    {
      open ?      <span className="material-symbols-outlined auth" onClick={()=>setOpen((index)=>!index)}>
      👀
      </span> :      <span className="material-symbols-outlined auth" onClick={()=>setOpen((index)=>!index)}>
🛡️
</span>
    }

    </div>
  <br/>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="auth-help">
          Forgot your password? <a href="/reset-password">Reset it here</a>
        </p>
      </form>
    </div>
  );
};

export default Auth;
