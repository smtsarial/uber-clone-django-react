import React, { useState, useEffect } from "react";
import Loading from "./Loading";

const Restriction = (props) => {
  const [loading, setLoading] = useState(true);
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
        if (data.hes_code === "PENDING") {
          localStorage.clear();
        } else if (data.hes_code === "ACCEPTED") {
          if (data.is_driver == true) {
            localStorage.setItem("user_id", data.pk);
            window.location.replace(window.env.FRONTEND_URL + "/driver");
          } else {
            localStorage.setItem("user_id", data.pk);
            window.location.replace(window.env.FRONTEND_URL + "/traveller");
          }
        } else {
          localStorage.clear();
        }
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1 style={{ fontSize: "35px", textAlign: "center" }}>
        You Do Not Have a Access
      </h1>
      <div id="restriction" style={{ textAlign: "center" }}>
        <h3>You are in the risk group!</h3>
        <h3>Please contact with admin!</h3>
        <h3>info@campusdriver.com</h3>
      </div>
    </div>
  );
};

export default Restriction;
