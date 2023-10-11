import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Logo from "../../images/background.jpg"

const Navbar = () => {
  const navigate = useNavigate();
  const token = Cookies.get('TrainLogin');


  const handleLogout = () => {
    Cookies.remove("TrainLogin");
    window.location.reload();
    navigate("/");
  }

  return (
    <nav className="bg-white p-3">
    <div className="container d-flex justify-content-between align-items-center">
      <div class="mr-4">
        <a href="/">
          <img
            src={Logo}
            alt="Logo"
            width={100}
            height={100}
            className="h-10"
          />
        </a>
      </div>

        <a href="/traveler-booking" style={{fontSize:"20px", color:"black"}}>
            <b>Book Train</b>
        </a>

      <div class="d-md-flex">
        {token === "" ? (
          <>
            <a href="/login">
              <button
                class="btn btn-primary mr-2"
              >
                Login
              </button>
            </a>
            <a href="/register">
              <button
                class="btn btn-primary"
              >
                Register
              </button>
            </a>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/traveler-profile")}
              class="btn btn-primary mr-2"
            >
              Profile
            </button>
            <button
              class="btn btn-primary"
              onClick={handleLogout}
            >
              Log out
            </button>
          </>
        )}
      </div>
    </div>
  </nav>
  
  );
};

export default Navbar;
