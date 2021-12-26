import React, { useState, useEffect, Fragment } from "react";
import { Button } from "react-bootstrap";

const Trips = (props) => {
  const [requests, setRequests] = useState("");
  const [update, setUpdate] = useState();

  const deleteTripDetailsHandle = (e) => {
    fetch(
      window.env.BACKEND_URL + "/api/v1/users/delete-trip/" + e.target.value,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.text())
      .then((res) => setUpdate(res));
  };

  useEffect(() => {
    fetch(
      window.env.BACKEND_URL + "/api/v1/users/trips/traveller/" + localStorage.getItem("user_id"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
      });
  }, [update]);

  if (requests.length !== 0) {
    return (
      <div>
        <h1
          style={{
            fontSize: "35px",
            textAlign: "center",
            paddingTop: "20px",
            fontWeight: "bold",
          }}
        >
          Sended Requests
        </h1>

        <div id="carpooling-groups">
          {requests.map((element) => (
            <div key={element.id} id="carpooling-card">
              <h3>ID {element.id}</h3>
              <h5>
                Start Location: {element.startLong} - {element.startLat}
              </h5>
              <h5>
                End Location: {element.endLong} - {element.endLat}
              </h5>
              <h5>Star: {element.givenStar}</h5>
              <h5>Price: {element.price}TL</h5>
              <h5>Status: {element.status}</h5>
              <h5>Driver ID: {element.driverId}</h5>
              <Button
                variant="danger"
                value={element.id}
                onClick={(e) => {
                  deleteTripDetailsHandle(e);
                }}
              >
                Delete
              </Button>{" "}
              <hr></hr>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1 style={{ fontSize: "35px", textAlign: "center" }}>Car Pooling</h1>
        <div id="carpooling-card">
          <h3>No Group Found!</h3>
        </div>
      </div>
    );
  }
};

export default Trips;
