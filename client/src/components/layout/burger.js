import { slide as Menu } from "react-burger-menu";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const BurgerMenu = (props) => {
  const [avaliableDrivers, setAvaliableDrivers] = useState([
    {
      driverName: "Samet1",
      carType: "VAN",
      star: "1",
      driverUsername: "smtsarial1",
    },
    {
      driverName: "Samet2",
      carType: "VAN",
      star: "2",
      driverUsername: "smtsarial2",
    },
    {
      driverName: "Samet3",
      carType: "VAN",
      star: "3",
      driverUsername: "smtsarial3",
    },
    {
      driverName: "Samet4",
      carType: "VAN",
      star: "4",
      driverUsername: "smtsarial4",
    },
  ]);
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
            <div key={element.groupId} id="carpooling-card">
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

          {avaliableDrivers.map((element) => (
            <div key={element.groupId} id="carpooling-card">
              <h4>Driver Username: {element.driverUsername}</h4>
              <h5>Driver Name: {element.driverName}</h5>
              <h5>Car Type: {element.carType}</h5>
              <h5>Driver Star: {element.star}</h5>
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
