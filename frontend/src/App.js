import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeliveryPage from "./Pages/DeliveryPage.js";
import OrderPage from "./Pages/OrderPage.js";
import SellerPage from "./Pages/SellerPage.js";
import Home from "./Pages/Home.js";
//import { Button } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/selling" element={<SellerPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
