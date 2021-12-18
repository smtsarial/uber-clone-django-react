import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

const CarPooling = (props) => {
  const [groupList, setGroupList] = useState([
    { groupName: "Samet", personCount: "5", groupId: "1" },
    { groupName: "Samet1", personCount: "5", groupId: "2" },
    { groupName: "Samet2", personCount: "5", groupId: "3" },
  ]);
  if (groupList.length !== 0) {
    return (
      <div>
        <h1 style={{ fontSize: "35px", textAlign: "center",paddingTop:"20px",fontWeight:"bold"}}>Car Pooling</h1>

        <div id="carpooling-groups">{groupList.map((element) => (
          <div key={element.groupId} id="carpooling-card">
            <h3>Group ID: {element.groupId}</h3>
            <h4>Group Name: {element.groupName}</h4>
            <h5>Person Count: {element.personCount}</h5>
            <Button variant="success">Join</Button>{" "}
            <hr></hr>
          </div>
        ))}</div>
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

export default CarPooling;
