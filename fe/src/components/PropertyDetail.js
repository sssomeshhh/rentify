import React, { useEffect, useState } from "react";

import "./PropertyList.css";
import "../assets/style.css";

import { apiRequest } from "../helpers/api";
import { getAuthHeader } from "../helpers/auth";
import Header from "./Header";

const PropertyDetail = () => {
  const [detail, setDetail] = useState([]);

  const [whichView, setWhichView] = useState('show');

  const getDetail = () => {
    apiRequest('GET', location.pathname, { headers: { ...getAuthHeader() } })
      .then((res) => {
        setDetail(res.data);
        console.log("Property details fetched!", res.data);
      })
      .catch((err) => {
        console.error("There was an error fetching the property details!", err);
      });
  }

  const handleLike = () => {
  };

  const handleInterested = (e) => {
    e.preventDefault();
    if (sessionStorage.getItem('role') == null) {
        alert('Please Login!');
        location.href = location.origin + '/login';
    }
    setWhichView("user");
    //location.reload();
  };

  const handleChange = (e) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    apiRequest('POST', location.pathname, { data: detail, headers: { ...getAuthHeader() } })
      .then((res) => {
        console.log("Property updated!", res.data);
        alert("Property updated!");
        setWhichView("show");
        location.reload();
      })
      .catch((err) => {
        console.error("There was an error updating the property!", err);
        alert("There was an error updating the property!");
        setWhichView("show");
        location.reload();
      });
  };

  useEffect(() => {
    getDetail();
  }, []);

  const handleEdit = () => {
    setWhichView("edit");
    //location.reload();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    apiRequest("DELETE", location.pathname, { headers: { ...getAuthHeader() } })
      .then((res) => {
        console.log("Property deleted!", res.data);
        alert("Property deleted!");
        location.href = location.origin + '/property/list';
      })
      .catch((err) => {
        console.error("There was an error deleting the property!", err);
        alert("There was an error deleting the property!");
        location.href = location.origin + '/property/list';
      });
  };

  const renderView = () => {
    if (whichView === 'show') {
      return (
        <div>
          <p>Title: {detail.title}</p>
          <br />
          <p>Description: {detail.description}</p>
          <br />
          <p>Location: {detail.location}</p>
          <br />
          <p>Bedrooms: {detail.bedrooms}</p>
          <br />
          <p>Bathrooms: {detail.bathrooms}</p>
          <br />
          <p>Rent: {detail.rent}</p>
          <br />
          {(sessionStorage.getItem("role") === "seller")
            ? (
              <div>
                <button className="editproperty" onClick={handleEdit}>Edit</button>
                <button className="deleteproperty" onClick={handleDelete}>Delete</button>
              </div>
            )
            : (
              <div>
                <button className="likebutton" onClick={handleLike}>Like</button>
                <button className="interestedbutton" onClick={handleInterested}>Interested</button>
              </div>
            )
          }
        </div>
      );
    } else {
      if (whichView === "edit") {
        return (
          <div>
            <form onSubmit={handleUpdate}>
              <div>
                <label>Title:</label>
                <input type="text" name="title" value={detail.title} onChange={handleChange} />
              </div>
              <div>
                <label>Description:</label>
                <input type="text" name="description" value={detail.description} onChange={handleChange} />
              </div>
              <div>
                <label>Location:</label>
                <input type="text" name="location" value={detail.location} onChange={handleChange} />
              </div>
              <div>
                <label>Bedrooms:</label>
                <input type="number" name="bedrooms" value={detail.bedrooms} onChange={handleChange} />
              </div>
              <div>
                <label>Bathrooms:</label>
                <input type="number" name="bathrooms" value={detail.bathrooms} onChange={handleChange} />
              </div>
              <div>
                <label>Rent:</label>
                <input type="number" name="rent" value={detail.rent} onChange={handleChange} />
              </div>
              <button type="submit">Update</button>
            </form>
          </div>
        );
      } else {
        return (
          <div>
            <p>Name: {detail.seller.firstName} {detail.seller.lastName}</p>
            <br />
            <p>Email Address: {detail.seller.email}</p>
            <br />
            <p>Phone Number: {detail.seller.phoneNumber}</p>
          </div>
        );
      }
    }
  }

  return (
    <div>
      <Header />
      {renderView()}
    </div>
  );
};

export default PropertyDetail;
