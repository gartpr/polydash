import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeliveryPage from "./Pages/DeliveryPage.js";
import OrderPage from "./Pages/OrderPage.js";
import SellerPage from "./Pages/SellerPage.js";
import Home from "./Pages/Home.js";
import OrderForm from "./Pages/OrderForm.js"
import RestaurantMenu from "./Pages/RestaurantMenu.js"
//import { Button } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/seller" element={<SellerPage />} />
          <Route path="/order/form" element={<OrderForm/>} />
          <Route path="/order/menu" element={<RestaurantMenu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
