import React, { useState } from 'react';

import "./Register.css";
import { apiRequest } from "../helpers/api";

import closeIcon from "../assets/close.png";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");

  const handleRegister = (e) => {
    e.preventDefault();
    apiRequest('PUT', '/user/register', { data: { firstName, lastName, email, phoneNumber, password, role } })
      .then((res) => {
        console.log('Registered successfully!', res.data);
        alert('Registered Successfully! Please Login!');
        location.href = location.origin + '/login';
      })
      .catch((err) => {
        console.error('There was an error registering!', err);
        alert('Cannot Register! Please Try Again!');
        location.href = location.origin + '/register';
      });
  };

  return (
    <div className="register_container" style={{width: "50%"}}>
      <div className="header" style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <span className="text" style={{flexGrow: "1"}}>SignUp</span>
        <div style={{display: "flex", flexDirection: "row", justifySelf: "end", alignSelf: "start"}}>
          <a href="/" onClick={() => {
            location.href = location.origin;
          }} style={{justifyContent: "space-between", alignItems: "flex-end"}}>
            <img style={{width: "1cm"}} src={closeIcon} alt="X"/>
          </a>
        </div>
        <hr/>
      </div>

      <form onSubmit={handleRegister}>
        <div className="inputs">
          <div>
            <label>First Name:</label>
            <input type="text" name="first_name" placeholder="First Name" className="input_field"
                   onChange={(e) => setFirstName(e.target.value)} />
          </div>

          <div>
            <label>Last Name:</label>
            <input type="text" name="last_name" placeholder="Last Name" className="input_field"
                   onChange={(e) => setLastName(e.target.value)} />
          </div>

          <div>
            <label>Email:</label>
            <input type="email" name="email" placeholder="Email" className="input_field"
                   onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input">
            <label>Phone Number:</label>
            <input name="phn" type="number" placeholder="Phone Number" className="input_field"
                   onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>

          <div className="input">
            <label>Password:</label>
            <input name="psw" type="password" placeholder="Password" className="input_field"
                   onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div>
            <label>Role:</label>
            <select name="role" onChange={(e) => setRole(e.target.value)}>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

        </div>
        <div className="submit_panel">
          <input className="submit" type="submit" value="Register" />
        </div>
      </form>
    </div>
  )
};

export default Register;
