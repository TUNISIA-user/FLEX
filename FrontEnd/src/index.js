import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './Store/GlobalContext'; // Import the ContextProvider
import { BrowserRouter  as Router} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
     <ChakraProvider>  
    <ContextProvider>  {/* Use ContextProvider here */}
    <Router>   
      <App />
      </Router>
    </ContextProvider>
    </ChakraProvider>
  // </React.StrictMode>
);

