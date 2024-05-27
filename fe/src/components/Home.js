import React from "react";

import { Link } from "react-router-dom";
import PageHeader from "./PageHeader";

import houseIcon from "../assets/house.png"

const Home = () => {
  return (
    <div>
      <PageHeader />
      <div style={{ "display": "flex", "flex-direction": "column" }}>
        <div className="card" style={{ "width": "50%", "margin-top": "50px", "align-self": "center" }}>
          <img src={houseIcon} className="card-img-top" alt="..." />
          <div className="banner">
            <h5>Welcome to Rentify!</h5>
            <Link to="/property/list" className="btn" style={{ "background-color": "aqua", "margin": "10px" }}>View
              Properties</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
