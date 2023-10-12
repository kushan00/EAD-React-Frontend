import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Logo from "../../images/booking.png"

const Navbar = () => {
  const navigate = useNavigate();
  const token = Cookies.get('TrainLogin');


  const handleLogout = () => {
    Cookies.remove("TrainLogin");
    window.location.reload();
    navigate("/");
  }

  return (
    <nav className="bg-dark p-4" style={{ border: '1px solid #fff', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}>
      <div className="container d-flex justify-content-between align-items-center">
        <div class="mr-4">
          <a href="/traveler-booking">
            <img
              src={Logo}
              alt="Logo"
              width={50}
              height={50}
              className="h-10"
            />
          </a>
        </div>

        <a href="/traveler-booking" style={{ fontSize: "20px", color: "black" }}>
          <b style={{
            color: 'white',
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textAlign: 'center',
            textShadow: '4px 4px 4px rgba(0, 0, 0, 0.3)',
          
          }}>Simplify Your Travels with Swift and Secure Train Reservations</b>
          
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
