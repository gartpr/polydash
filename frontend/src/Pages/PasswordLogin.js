import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import RegisterAndLogin from '../RegisterAndLogin';
import Home from './Home';

function PasswordLogin() {
  return (
    <BrowserRouter>
      <div>
        <Route>
          <Route path="/" element={<RegisterAndLogin />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </div>
    </BrowserRouter>
  );
}
