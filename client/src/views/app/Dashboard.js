import React, { useState, useEffect } from "react";
import Loading from "./Loading";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.replace(window.env.FRONTEND_URL + "/login");
    } else {
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
            window.location.replace(window.env.FRONTEND_URL + "/driver");
          } else {
            window.location.replace(window.env.FRONTEND_URL + "/traveller");
          }
          setLoading(false);
        });
    }
  }, []);

  return <div id="dash">{loading === true && <Loading></Loading>}</div>;
};

export default Dashboard;
