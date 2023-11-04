import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing.js";
import DeliveryOrder from "./Pages/DeliveryOrder.js";
import Home from "./Pages/Home.js";
//import { Button } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/ >}>
            <Route path="home" element={<Home />} />
            <Route path="deliveryorder" element={<DeliveryOrder />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
