import { slide as Menu } from "react-burger-menu";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

const BurgerMenu = (props) => {
  const [avaliableDrivers, setAvaliableDrivers] = useState([]);
  const [travellerRequests, setTravellerRequests] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [userType, setUserType] = useState("");
  const [TripStartLang, setTripStartLang] = useState();
  const [TripStartLat, setTripStartLat] = useState();
  const [TripEndLong, setTripEndLong] = useState();
  const [TripEndLat, setTripEndLat] = useState();
  const [TripDriverId, setTripDriverId] = useState();
  const [TripTravellerId, setTripTravellerId] = useState();
  const [TripPrice, setTripPrice] = useState();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setUserType("");
    } else {
      setIsAuth(true);
      fetch(window.env.BACKEND_URL + "/api/v1/users/")
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setAvaliableDrivers(response);
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
          setTripTravellerId(data.pk);
          setTripStartLang(data.longitude);
          setTripStartLat(data.latitude);
          if (data.is_driver === false) {
            setUserType("Traveller");
          } else {
            setUserType("Driver");
          }
        });
    }
  }, []);

  const createTripHandle = (e) => {
    setTripDriverId(e.target.value);
    var price = calcCrow(
      TripStartLang,
      TripStartLat,
      TripEndLong,
      TripEndLat
    ).toFixed(1);
    const trip = {
      startLong: TripStartLang,
      endLong: TripEndLong,
      startLat: TripStartLat,
      endLat: TripEndLat,
      givenStar: 1,
      price: price,
      status: "pending",
      driverId: TripDriverId,
      travellerId: TripTravellerId,
    };
    console.log(trip);

    fetch(window.env.BACKEND_URL + "/api/v1/users/create-trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trip),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    
  };

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
          <h1 style={{ fontSize: "35px", textAlign: "center" }}>Trips</h1>
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
          <Link
            style={{ fontSize: "25px", color: "green" }}
            className="link_nav"
            to="/trips"
            
          >
            All Requests
          </Link>
          <span>
            <h3 style={{ textAlign: "center" }}>Destination</h3>
            <div
              style={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",
              }}
            >
              <label>
                Longitude
                <div>
                  <input
                    type="number"
                    step="0.1"
                    name="longitude"
                    placeholder="{longitude}"
                    onChange={(e) => {
                      if (!isNaN(+e.target.value)) {
                        setTripEndLong(e.target.value);
                      } else {
                        console.log("not number");
                      }
                    }}
                  />
                </div>
              </label>
              <label>
                Latitude
                <div>
                  <input
                    type="number"
                    step="0.1"
                    name="latitude"
                    placeholder="{latitude}"
                    onChange={(e) => {
                      if (!isNaN(+e.target.value)) {
                        setTripEndLat(e.target.value);
                        console.log(TripDriverId);
                      } else {
                        console.log("not number");
                      }
                    }}
                  />
                </div>
              </label>
            </div>
          </span>

          {avaliableDrivers.map((element) => (
            <div key={uuidv4()} id="driver-card">
              <h4>Driver Username: {element.username}</h4>
              <h5>Driver Email: {element.email}</h5>
              <h5>
                Driver Name: {element.first_name} {element.last_name}
              </h5>
              <h5>Car Type: VAN</h5>
              <h5>Driver Star: 5</h5>
              <Button
                variant="success"
                value={element.pk}
                onClick={(e) => {
                  createTripHandle(e);
                }}
              >
                Send Request
              </Button>{" "}
            </div>
          ))}
        </Menu>
      );
    } else {
      return (
        <Menu right pageWrapId={"page-wrap"} width={"45%"}>
          <h1 style={{ fontSize: "35px", textAlign: "center" }}>Trips</h1>
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
