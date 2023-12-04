import './App.css';
import { Routes, Route } from 'react-router-dom';
import DeliveryPage from './Pages/DeliveryPage.js';
import OrderPage from './Pages/OrderPage.js';
import SellerPage from './Pages/SellerPage.js';
import Home from './Pages/Home.js';
import OrderForm from './Pages/OrderForm.js';
import RestaurantMenu from './Pages/RestaurantMenu.js';
import RegisterAndLogin from './Pages/RegisterAndLogin.js';
import ForgotPassword from './Pages/ForgotPassword';
import OrderTrackingPage from './Pages/OrderTracking.js';
import UserInformation from './Pages/UserInformation';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/order/form" element={<OrderForm />} />
        <Route path="/order/menu/:restaurantId" element={<RestaurantMenu />} /> 
        <Route path="/order/tracking" element={<OrderTrackingPage />} />
        <Route path="/signin" element={<RegisterAndLogin />} />
        <Route path="/reset" element={<ForgotPassword />} />
        <Route path="/userinfo/:userId" element={<UserInformation />} />
      </Routes>
    </div>
  );
}

export default App;
