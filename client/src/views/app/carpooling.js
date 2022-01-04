import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

const CarPooling = (props) => {
  const [groupList, setGroupList] = useState([]);
  const [show, setShow] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [wplink, setWpLink] = useState("");
  const [clicked, setClicked] = useState("");
  const [registeredGroup, SetregisteredGroup] = useState();
  const [registeredGroupList, SetregisteredGroupList] = useState();
  const [start_time, setStart_time] = useState("");
  const [ppp,setPpp] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.replace(window.env.FRONTEND_URL + "/login");
    } else {
      fetch(window.env.BACKEND_URL + "/api/v1/users/carpooling/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setGroupList(data);
        });
    }
    fetch(
      window.env.BACKEND_URL +
        "/api/v1/users/user-cargroup/" +
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
        SetregisteredGroup(data.registeredCarGroup);
      });
  }, [clicked]);

  const handleClose = () => setShow(false);

  const handleSaveClose = () => {
    if (groupName.length !== 0 && wplink.length !== 0) {
      const carpooling = {
        groupName: groupName,
        wplink: wplink,
        member_id: localStorage.getItem("user_id"),
        creator_id: localStorage.getItem("user_id"),
        start_time: start_time,
        ppp: ppp,
      };

      fetch(window.env.BACKEND_URL + "/api/v1/users/carpooling/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carpooling),
      })
        .then((res) => res.json())
        .then((data) => {
          setClicked(data);
        });

      setShow(false);
    } else {
      alert("please fill the inputs");
    }
  };
  const handleShow = () => setShow(true);
  const handleJoinGroup = (e) => {
    fetch(
      window.env.BACKEND_URL +
        "/api/v1/users/user-cargroup/" +
        localStorage.getItem("user_id"),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          pk: localStorage.getItem("user_id"),
          registeredCarGroup: e,
        }),
      }
    );
    setClicked("asf");
  };
  const handleLeaveGroup = () => {
    fetch(
      window.env.BACKEND_URL +
        "/api/v1/users/user-cargroup/" +
        localStorage.getItem("user_id"),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          pk: localStorage.getItem("user_id"),
          registeredCarGroup: 0,
        }),
      }
    );
    setClicked("asasfasff");
  };

  return registeredGroup !== 0 ? (
    <div>
      <h1
        style={{
          fontSize: "35px",
          textAlign: "center",
          paddingTop: "20px",
          fontWeight: "bold",
        }}
      >
        Your Registered Group
      </h1>
      <div style={{ textAlign: "center" }}>
        <Button
          style={{
            textAlign: "center",
            margin: "auto",
          }}
          onClick={handleLeaveGroup}
        >
          Leave Group
        </Button>
      </div>
      <div id="carpooling-groups">
        {groupList
          .filter((x) => x.id === registeredGroup)
          .map((element) => (
            <div key={element.id} id="carpooling-card">
              <h3>Group Name: {element.groupName}</h3>
              <h3>PPP: {element.ppp} TL</h3>
              <h4>Whatsapp Link: {element.wplink}</h4>
              <h4>Start Time: {element.start_time}</h4>
            </div>
          ))}
      </div>
    </div>
  ) : (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Carpooling Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="create-pool-form">
            <label>
              Group Name
              <div>
                <input
                  type="text"
                  name="group_name"
                  placeholder="Group Name"
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
            </label>
            <label>
              Whatsapp Link
              <div>
                <input
                  type="text"
                  name="wp_link"
                  placeholder="Whatsapp Link"
                  onChange={(e) => setWpLink(e.target.value)}
                />
              </div>
            </label>
            <label>
              PPP Price Per Person
              <div>
                <input
                  type="number"
                  name="ppp"
                  placeholder="PPP Price Per Person"
                  onChange={(e) => setPpp(e.target.value)}
                />
              </div>
            </label>
            <label>
              Time
              <div>
                <input
                  type="time"
                  name="time"
                  onChange={(e) => setStart_time(e.target.value)}
                />
              </div>
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveClose}>
            Create Group
          </Button>
        </Modal.Footer>
      </Modal>
      <h1
        style={{
          fontSize: "35px",
          textAlign: "center",
          paddingTop: "20px",
          fontWeight: "bold",
        }}
      >
        Car Pooling
      </h1>
      <div id="carpooling-groups">
        <Button variant="info" onClick={handleShow}>
          Create Carpooling Group
        </Button>
        {groupList.map((element) => (
          <div key={element.id} id="carpooling-card">
            <h3>Group Name: {element.groupName}</h3>
            <h4>Whatsapp Link: {element.wplink}</h4>
            <h4>Start Time: {element.start_time}</h4>
            <h3>PPP: {element.ppp} TL</h3>
            <Button
              value={element.id}
              variant="success"
              onClick={(e) => {
                handleJoinGroup(e.target.value);
              }}
            >
              Join
            </Button>{" "}
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarPooling;
