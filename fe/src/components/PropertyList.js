import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "./Header";

import "../assets/style.css";
import "./PropertyList.css";

import { apiRequest } from "../helpers/api";
import { getAuthHeader } from "../helpers/auth";

const PropertyList = () => {
  const [propertyList, setPropertyList] = useState([]);
  let [locations, setLocations] = useState([]);

  const getProperties = () => {
    apiRequest('GET', '/property', { headers: { ...getAuthHeader() } })
      .then((res) => {
        let allProperties = Array.from(res.data);
        let locations = [];
        allProperties.forEach((property) => {
          locations.push(property.location);
        })
        setLocations(Array.from(new Set(locations)));
        setPropertyList(allProperties);
        console.log("Properties fetched!", res.data);
      })
      .catch((err) => {
        console.error("There was an error fetching the properties!", err);
      });
  };

  const filterProperties = (e) => {
    let locationProperties = [];
    propertyList.forEach((property) => {
      if (property.location === e) {
        locationProperties.push(property);
      }
    });
    setPropertyList(Array.from(locationProperties));
  }

  useEffect(() => {
    getProperties();
  }, []);
  return (
    <div>
      <Header/>
      <table className='table'>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Rent</th>
          <th>
            <select name="location" id="location" onChange={(e) => filterProperties(e.target.value)}>
              <option value="" selected disabled hidden>Location</option>
              <option value="All">All Locations</option>
              {locations.map(location => (
                <option value={location}>{location}</option>
              ))}
            </select>
          </th>
        </tr>
        {propertyList.map(property => (
          <tr>
            <td>
              <Link to={`/property/detail/${property._id}`}>{property.title}</Link>
            </td>
            <td>{property.description}</td>
            <td>{property.rent}</td>
            <td>{property.location}</td>
          </tr>
        ))}
      </table>
      ;
    </div>
  );
};

export default PropertyList;
