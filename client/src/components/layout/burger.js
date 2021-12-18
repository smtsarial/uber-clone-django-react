import { slide as Menu } from "react-burger-menu";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const BurgerMenu = (props) => {
  const [avaliableDrivers, setAvaliableDrivers] = useState([]);
  const [travellerRequests, setTravellerRequests] = useState([
    {
      travellerId: "1",
      travellerName: "Samet",
      profit: "20",
    },
    {
      travellerId: "1",
      travellerName: "Samet",
      profit: "20",
    },
    {
      travellerId: "1",
      travellerName: "Samet",
      profit: "20",
    },
    {
      travellerId: "1",
      travellerName: "Samet",
      profit: "20",
    },
    {
      travellerId: "1",
      travellerName: "Samet",
      profit: "20",
    },
    {
      travellerId: "1",
      travellerName: "Samet",
      profit: "20",
    },
  ]);
  const [isAuth, setIsAuth] = useState(false);
  const [userType, setUserType] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setUserType("");
    } else {
      setIsAuth(true);
      fetch(window.env.BACKEND_URL + "/api/v1/users/")
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setAvaliableDrivers(response)
        });
      fetch(window.env.BACKEND_URL + "/api/v1/users/auth/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.is_driver === false) {
            setUserType("Traveller");
          } else {
            setUserType("Driver");
          }
        });
    }
  }, []);

  if (userType === "Driver") {
    if (travellerRequests.length !== 0) {
      return (
        <Menu right pageWrapId={"page-wrap"} width={"45%"}>
          <h1 key="asfasf" style={{ fontSize: "35px", textAlign: "center" }}>
            Traveller Requests
          </h1>
          {travellerRequests.map((element) => (
            <div key={uuidv4()} id="carpooling-card">
              <h4>Traveller Name: {element.travellerName}</h4>
              <h5>Traveller ID: {element.travellerId}</h5>
              <h5>Estimated Profit: {element.profit} TL</h5>
              <div>
                <Button variant="success">Accept</Button>{" "}
                <Button variant="warning">Decline</Button>{" "}
              </div>
            </div>
          ))}
        </Menu>
      );
    } else {
      return (
        <Menu right pageWrapId={"page-wrap"} width={"45%"}>
          <h1 style={{ fontSize: "35px", textAlign: "center" }}>Car Pooling</h1>
          <div id="carpooling-card">
            <h3>No Group Found!</h3>
          </div>
        </Menu>
      );
    }
  } else {
    if (avaliableDrivers.length !== 0) {
      return (
        <Menu right pageWrapId={"page-wrap"} width={"45%"}>
          <h1 style={{ fontSize: "35px", textAlign: "center" }}>
            Avaliable Drivers
          </h1>
          <span>
            <h3 style={{ textAlign: "center" }}>Destination</h3>
            <div style={{ display: "flex",margin:"auto",justifyContent:"center"}}>
              <label>
                Longitude
                <div>
                  <input
                    type="text"
                    name="longitude"
                    placeholder="{longitude}"
                  />
                </div>
              </label>
              <label>
                Latitude
                <div>
                  <input type="text" name="latitude" placeholder="{latitude}" />
                </div>
              </label>
            </div>
          </span>

          {avaliableDrivers.map((element) => (
            <div key={uuidv4()} id="driver-card">
              <h4>Driver Username: {element.username}</h4>
              <h5>Driver Email: {element.email}</h5>
              <h5>Driver Name: {element.first_name} {element.last_name}</h5>
              <h5>Car Type: VAN</h5>
              <h5>Driver Star: 5</h5>
              <Button variant="success">Send Request</Button>{" "}
            </div>
          ))}
        </Menu>
      );
    } else {
      return (
        <Menu right pageWrapId={"page-wrap"} width={"45%"}>
          <h1 style={{ fontSize: "35px", textAlign: "center" }}>Car Pooling</h1>
          <div id="carpooling-card">
            <h3>No Group Found!</h3>
          </div>
        </Menu>
      );
    }
  }
};

export default BurgerMenu;

// bu link navigasyonu göstermede kullanılacaktır
//https://www.google.com/maps/dir/40.05503,+28.08488/40.0550272,29.0848768/@40.1163669,28.0303126,9z/data=!3m1!4b1!4m9!4m8!1m5!1m1!1s0x0:0x90bae5d7308c35c0!2m2!1d28.08488!2d40.05503!1m0!3e0