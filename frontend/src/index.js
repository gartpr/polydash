import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './Components/NavBar';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './Components/Cart';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <CartProvider>
        <Router>
        <Navbar/>
          <App />
        </Router>
      </CartProvider>
    </ChakraProvider>
  </React.StrictMode>
);
