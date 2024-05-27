import React, { useState } from 'react';

import "./Login.css";
import { apiRequest } from "../helpers/api";
import Header from "./Header";
import { Link } from "react-router-dom";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    apiRequest('POST', '/user/login', { data: {email, password} })
      .then((res) => {
        sessionStorage.setItem('email', res.data.email)
        sessionStorage.setItem('role', res.data.role);
        sessionStorage.setItem('token', res.data.token);
        console.log('Logged in successfully!', res.data);
        setOpen(false);
      })
      .catch((err) => {
        console.error('There was an error logging in!', err);
      });
  };
  if (!open) {
    window.location.href = "/";
  }
  return (
    <div>
      <Header/>
      <div onClick={onClose}>
        <div onClick={(e) => {e.stopPropagation();}} className='modalContainer'>
          <form className="login_panel" style={{}} onSubmit={handleLogin}>
            <div>
              <span className="input_field">Email </span>
              <input type="text" name="email" placeholder="Email" className="input_field"
                     onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
              <span className="input_field">Password </span>
              <input name="psw" type="password" placeholder="Password" className="input_field"
                     onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
              <input className="action_button" type="submit" value="Login"/>
              <input className="action_button" type="button" value="Cancel" onClick={() => setOpen(false)}/>
            </div>
            <Link to="/register" className="loginlink">Register Now</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
