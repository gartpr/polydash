import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Landing;