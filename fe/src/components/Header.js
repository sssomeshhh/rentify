import React from 'react';

import "../assets/style.css";
import "../assets/bootstrap.min.css";
import { Link } from "react-router-dom";

const Header = () => {
  const handleLogout = async (e) => {
    e.preventDefault();
    let email = sessionStorage.getItem('email');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    window.location.href = window.location.origin;
    window.location.reload();
    alert("Logging out " + email + "...")
  };

  let userPanel;

  let userEmail = sessionStorage.getItem('email')

  if (userEmail !== null && userEmail !== "") {
    userPanel = <div className="input_panel">
      <text className='email'>{userEmail}</text>
      <Link to="/logout" className="nav_item" onClick={handleLogout}>Logout</Link>
    </div>
  }else {
    userPanel = <div className="input_panel">
      <Link to="/login" className="homepage_links">Login</Link>
      <Link to="/register" className="homepage_links">Register</Link>
    </div>
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "darkturquoise", height: "1in"}}>
        <div className="container-fluid">
          <h1 style={{paddingRight: "5%"}}>Rentify</h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                  aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" style={{fontSize: "larger"}} aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/property/list" className="nav-link" style={{fontSize: "larger"}}>Property List</Link>
              </li>
              <li className="nav-item">
                <Link to="/property/add" className="nav-link" style={{fontSize: "larger"}}>Property Add</Link>
              </li>
            </ul>
            <span className="navbar-text">
              <div className="loginlink" id="loginlogout">
                {userPanel}
              </div>
            </span>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header;
