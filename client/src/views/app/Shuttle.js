import React, { useState, useEffect } from "react";
import Loading from "./Loading";

import { Button, Modal } from "react-bootstrap";

const Shuttle = (props) => {
  const [loading, setLoading] = useState(true);
  const [shuttles, setShuttles] = useState([]);
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
        if (data.is_driver == true) {
          localStorage.setItem("user_id", data.pk);
          window.location.replace(window.env.FRONTEND_URL + "/driver");
        } else {
          localStorage.setItem("user_id", data.pk);
        }
        setLoading(false);
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
        console.log(data);
        setShuttles(data);
      });
  }, []);

  const handleSubmit = (value,prevCapacity) => {
    console.log(prevCapacity);
    fetch(
      window.env.BACKEND_URL +
        "/api/v1/users/shuttle/1" +value,
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
          <h4>Remaining Capacity: {element.remaining_capacity} Person</h4>
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
