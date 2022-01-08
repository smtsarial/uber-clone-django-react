import { slide as Menu } from "react-burger-menu";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

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
  const [userType, setUserType] = useState("");
  const [TripStartLang, setTripStartLang] = useState();
  const [TripStartLat, setTripStartLat] = useState();
  const [TripEndLong, setTripEndLong] = useState();
  const [TripEndLat, setTripEndLat] = useState();
  const [TripDriverId, setTripDriverId] = useState();
  const [TripTravellerId, setTripTravellerId] = useState();
  const [preBudget, setPreBudget] = useState();
  const [clicked, setClicked] = useState();
  const [userLocLong, setUserLocLong] = useState();
  const [userLocLat, setUserLocLat] = useState();
  const [tripPrice, setTripPrice] = useState();
  const [createdAlert, setCreatedAlert] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setUserType("");
    } else {
      fetch(window.env.BACKEND_URL + "/api/v1/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
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
          setPreBudget(data.balance);
          setUserLocLong(data.longitude);
          setUserLocLat(data.latitude);
          if (data.is_driver === false) {
            setUserType("Traveller");
          } else {
            setUserType("Driver");
          }
        });
      fetch(
        window.env.BACKEND_URL +
          "/api/v1/users/trips/driver/" +
          localStorage.getItem("user_id")
      )
        .then((response) => response.json())
        .then((response) => {
          setTravellerRequests(response);
        });
    }
  }, [clicked]);

  const tripCompletedHandle = (e) => {
    var a = travellerRequests.filter((x) => x.id === parseInt(e))[0];
    if (a.status !== "COMPLETED") {
      fetch(
        window.env.BACKEND_URL + "/api/v1/users/change-trip-status/" + a.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            id: a.id,
            startLong: a.startLong,
            endLong: a.endLong,
            startLat: a.startLat,
            endLat: a.endLat,
            givenStar: a.givenStar,
            price: a.price,
            status: "COMPLETED",
            driverId: a.driverId,
            travellerId: a.travellerId,
          }),
        }
      );
      fetch(
        window.env.BACKEND_URL + "/api/v1/users/user-balance/" + a.driverId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            pk: a.driverId,
            balance: parseFloat(preBudget) + parseFloat(a.price),
          }),
        }
      );
    } else {
      console.log("status completed");
    }
  };

  const tripAcceptHandle = (e) => {
    var a = travellerRequests.filter((x) => x.id === parseInt(e))[0];
    if (a.status !== "ACCEPTED") {
      fetch(
        window.env.BACKEND_URL + "/api/v1/users/change-trip-status/" + a.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            id: a.id,
            startLong: a.startLong,
            endLong: a.endLong,
            startLat: a.startLat,
            endLat: a.endLat,
            givenStar: a.givenStar,
            price: a.price,
            status: "ACCEPTED",
            driverId: a.driverId,
            travellerId: a.travellerId,
          }),
        }
      );
      fetch(
        window.env.BACKEND_URL + "/api/v1/users/user-balance/" + a.driverId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            pk: a.driverId,
            balance: parseFloat(preBudget),
          }),
        }
      );
    } else {
      console.log("status accepted");
    }
  };

  const tripDeclineHandle = (e) => {
    var a = travellerRequests.filter((x) => x.id === parseInt(e))[0];
    if (a.status !== "DECLINED") {
      fetch(
        window.env.BACKEND_URL + "/api/v1/users/change-trip-status/" + a.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            id: a.id,
            startLong: a.startLong,
            endLong: a.endLong,
            startLat: a.startLat,
            endLat: a.endLat,
            givenStar: a.givenStar,
            price: a.price,
            status: "DECLINED",
            driverId: a.driverId,
            travellerId: a.travellerId,
          }),
        }
      );
      fetch(
        window.env.BACKEND_URL + "/api/v1/users/user-balance/" + a.driverId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            pk: a.driverId,
            balance: Math.abs(parseFloat(preBudget) - parseFloat(a.price)),
          }),
        }
      );
    } else {
      console.log("status decline");
    }
  };

  const createTripHandle = (e, username) => {
    //IT CREATES TRIP FOR TRAVELLER HANDLER

    var price = calcCrow(
      TripStartLang,
      TripStartLat,
      TripEndLong,
      TripEndLat
    ).toFixed(2);
    setTripPrice(price);
    
    if(preBudget < price){
      setCreatedAlert(
        <h5 style={{ color: "red", textAlign: "center" }}>
          No budget for this trip
        </h5>
      )
    }else{
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
  
      fetch(window.env.BACKEND_URL + "/api/v1/users/create-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trip),
      })
        .then((res) => res.json())
        .then((data) =>
          setCreatedAlert(
            <h5 style={{ color: "red", textAlign: "center" }}>
              Request sent to {username}
            </h5>
          )
        );
    }
  };

  if (userType === "Driver") {
    if (travellerRequests.length !== 0) {
      return (
        <Menu right pageWrapId={"page-wrap"} width={"45%"}>
          <h1 key="asfasf" style={{ fontSize: "35px", textAlign: "center" }}>
            Traveller Requests
          </h1>
          <div>
            <h6
              key="asfasf"
              style={{ fontSize: "25px", textAlign: "center", color: "green" }}
            >
              Budget: {preBudget} TL
            </h6>
            <Button
              style={{
                textAlign: "center",
              }}
              variant="success"
              value={uuidv4()}
              onClick={(e) => {
                setClicked(e.target.value);
              }}
            >
              Refresh
            </Button>
          </div>
          {travellerRequests.map((element) => (
            <div key={uuidv4()} id="carpooling-card">
              <h4>Trip ID: {element.id}</h4>
              <h4>Traveller ID: {element.travellerId}</h4>
              <h5>
                Start Location: {element.startLong}-{element.startLat}
              </h5>
              <h5>
                End Location: {element.endLong}-{element.endLat}
              </h5>
              <h5>Earn: {element.price} TL</h5>
              <h5>Status: {element.status}</h5>
              <div>
                <Button
                  variant="info"
                  value={element.id}
                  onClick={(e) => {
                    tripAcceptHandle(e.target.value);
                    setClicked(uuidv4());
                  }}
                >
                  Accept
                </Button>{" "}
                <Button
                  variant="success"
                  value={element.id}
                  onClick={(e) => {
                    tripCompletedHandle(e.target.value);
                    setClicked(uuidv4());
                  }}
                >
                  COMPLETED
                </Button>{" "}
                <Button
                  variant="warning"
                  value={element.id}
                  onClick={(e) => {
                    tripDeclineHandle(e.target.value);
                    setClicked(uuidv4());
                  }}
                >
                  Decline
                </Button>{" "}
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
    //TRAVELLER PART
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

          {createdAlert}
          <span>
            <div>
              <h3 style={{ textAlign: "center" }}>Destination</h3>
              <Button
                style={{
                  textAlign: "center",
                }}
                variant="success"
                value={uuidv4()}
                onClick={(e) => {
                  setClicked(e.target.value);
                }}
              >
                Refresh
              </Button>

            </div>
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
            <p>İstanbul Medipol University Coordinates :<br></br> 41.09101684961034, 29.092565035853283</p>

          </span>

          {avaliableDrivers.map((element) => (
            <div key={uuidv4()} id="driver-card">
              <h4>Driver Username: {element.username}</h4>
              <h5>Driver Email: {element.email}</h5>
              <h5>
                Driver Name: {element.first_name} {element.last_name}
              </h5>
              <h5>Car Type: {element.cartype}</h5>
              <h5>HES Code: {element.hes_code}</h5>
              <h5>Driver Star: {element.star}</h5>

              <h5>Driver ID: {element.pk}</h5>
              {element.car_type.length !== 0 ? (
                <Button
                  variant="success"
                  value={element.pk}
                  onClick={(e) => {
                    setTripDriverId(e.target.value);
                    createTripHandle(e, element.username);
                  }}
                >
                  Send Request
                </Button>
              ) : (
                <h5 style={{ color: "red" }}>Driver has no car type!</h5>
              )}
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
