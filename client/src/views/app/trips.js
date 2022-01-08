import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

import { v4 as uuidv4 } from "uuid";

const Trips = (props) => {
  const [requests, setRequests] = useState("");
  const [update, setUpdate] = useState();
  const [show, setShow] = useState(false);
  const [commentstar, setCommentStar] = useState(4);

  const [prevStar, setprevStar] = useState(4);
  const handleClose = () => setShow(false);
  const thirdExample = {
    size: 40,
    count: 5,
    isHalf: false,
    value: 4,
    color: "gray",
    activeColor: "yellow",
    onChange: (newValue) => {
      console.log(`Example 3: new value is ${newValue}`);
      setCommentStar(newValue);
    },
  };

  const handleShow = () => setShow(true);
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

  const handleSaveClose = (e) => {
    fetch(window.env.BACKEND_URL + "/api/v1/users/user-star/" + e, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setprevStar(data.star);
      });
    if (e != null && commentstar != null) {
      setUpdate("comment added");
      fetch(window.env.BACKEND_URL + "/api/v1/users/user-star/" + e, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          pk: e,
          star: parseInt((parseFloat(prevStar) + parseFloat(commentstar)) / 2),
        }),
      });
      handleClose();
    } else {
      alert("please fill");
    }
  };

  useEffect(() => {
    fetch(
      window.env.BACKEND_URL +
        "/api/v1/users/trips/traveller/" +
        localStorage.getItem("user_id"),
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
          <Button
            style={{
              textAlign: "center",
            }}
            variant="success"
            value={uuidv4()}
            onClick={(e) => {
              setUpdate(e.target.value);
            }}
          >
            Refresh
          </Button>
          {requests.map((element) => (
            <div key={element.id} id="carpooling-card">
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Give Star for Your Trip</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h6>Give star for driver ID:{element.driverId}</h6>
                  <ReactStars {...thirdExample} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="success"
                    value={element.driverId}
                    onClick={(e) => {
                      handleSaveClose(e.target.value);
                    }}
                  >
                    Give Star to Driver
                  </Button>
                </Modal.Footer>
              </Modal>
              <h3>ID {element.id}</h3>
              <h5>
                Start Location: {element.startLong} - {element.startLat}
              </h5>
              <h5>
                End Location: {element.endLong} - {element.endLat}
              </h5>
              <h5>Driver Star (Before Trip): {element.givenStar}</h5>
              <h5
                style={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                Price: <h5 style={{ color: "green" }}>{element.price}TL</h5>
              </h5>
              <h5>Driver ID: {element.driverId}</h5>
              {element.status === "COMPLETED" ? (
                <div>
                  <h5>Status: {element.status}</h5>
                  <Button variant="info" onClick={handleShow}>
                    Give Star
                  </Button>
                </div>
              ) : (
                <div>
                  <h5>Status: {element.status}</h5>
                  <Button
                    variant="danger"
                    value={element.id}
                    onClick={(e) => {
                      deleteTripDetailsHandle(e);
                    }}
                  >
                    Delete
                  </Button>{" "}
                </div>
              )}

              <hr></hr>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1 style={{ fontSize: "35px", textAlign: "center" }}>All Trips</h1>
        <div style={{  textAlign: "center" }} id="carpooling-card">
        <Button
            style={{
              textAlign: "center",
            }}
            variant="success"
            value={uuidv4()}
            onClick={(e) => {
              setUpdate(e.target.value);
            }}
          >
            Refresh
          </Button>
          <h3>No Group Found!</h3>
        </div>
      </div>
    );
  }
};

export default Trips;
