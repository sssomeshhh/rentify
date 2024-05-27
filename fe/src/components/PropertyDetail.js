import React, { useEffect, useState } from "react";

import "./PropertyList.css";
import "../assets/style.css";

import { apiRequest } from "../helpers/api";
import { getAuthHeader } from "../helpers/auth";
import Header from "./Header";

const PropertyDetail = () => {
  const [detail, setDetail] = useState([]);

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

  const handleInterested = () => {
    return (
      <div>
        <p>Name: {detail.user.firstName} {detail.user.lastName}</p>
        <br />
        <p>Email Address: {detail.user.email}</p>
        <br />
        <p>Phone Number: {detail.user.phoneNumber}</p>
      </div>
    );
  };

  const handleChange = (e) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiRequest('POST', location, { data: detail, headers: { ...getAuthHeader() } })
      .then((res) => {
        console.log('Property updated!', res.data);
      })
      .catch((err) => {
        console.error('There was an error updating the property!', err);
      });
  };

  useEffect(() => {
    getDetail();
  }, []);

  const editProperty = () => {
    return (
      <form onSubmit={handleSubmit}>
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
    );
  };

  const deleteProperty = (e) => {
    e.preventDefault();
    apiRequest('DELETE', location.pathname, { headers: { ...getAuthHeader() } })
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

  return (
    <div>
      <Header />
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
      { (sessionStorage.getItem('role') === 'buyer')
        ? (
          <div>
            <button className="likebutton" onClick={handleLike}>Like</button>
            <button className="interestedbutton" onClick={handleInterested}>Interested</button>
          </div>
        )
        : (
          <div>
            <button className="editproperty" onClick={editProperty}>Edit</button>
            <button className="deleteproperty" onClick={deleteProperty}>Delete</button>
          </div>
        )
      }
    </div>
  );
};

export default PropertyDetail;
