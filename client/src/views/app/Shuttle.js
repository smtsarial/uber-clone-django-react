import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";

const Shuttle = (props) => {
  const [shuttles, setShuttles] = useState([]);
  const [update, setUpdate] = useState("");
  useEffect(() => {
    fetch(window.env.BACKEND_URL + "/api/v1/users/auth/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.is_driver === true) {
          localStorage.setItem("user_id", data.pk);
          window.location.replace(window.env.FRONTEND_URL + "/driver");
        } else {
          localStorage.setItem("user_id", data.pk);
        }
      });
    fetch(window.env.BACKEND_URL + "/api/v1/users/shuttles/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setShuttles(data);
      });
  }, [update]);

  const handleSubmit = (value,prevCapacity) => {
    console.log(prevCapacity);
    fetch(
      window.env.BACKEND_URL +
        "/api/v1/users/shuttle/" +value,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          pk: value,
          remaining_capacity: prevCapacity - 1,
        }),
      }
    );
    setUpdate(prevCapacity)
  };

  return (<div>
    <h1
          style={{
            fontSize: "35px",
            textAlign: "center",
            paddingTop: "20px",
            fontWeight: "bold",
          }}
        >
          Avaliable Shuttles
        </h1>
    <div id="carpooling-groups">
      
      {shuttles.map((element) => (
        <div key={element.id} id="restriction" style={{ textAlign: "center" }}>
          <h3>{element.shuttle_plate}</h3>
          <h4>
            Start Coordinates: {element.startLong}-{element.startLat}
          </h4>
          <h4>
            End Coordinates: {element.endLong}-{element.endLat}
          </h4>
          <h4>Remaining Capacity: {element.remaining_capacity} Seat</h4>
          <h4>Price: {element.price}</h4>
          <h4>Time: {element.start_time}</h4>
          <Button
            value={element.id}
            variant="success"
            onClick={(e) => {
              handleSubmit(e.target.value,element.remaining_capacity);
            }}
          >
            Take a Seat
          </Button>{" "}
          <hr></hr>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Shuttle;
