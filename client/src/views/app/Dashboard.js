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
          console.log(data.hes_code);
          if (data.hes_code === "PENDING") {
            localStorage.clear();
            window.location.replace(window.env.FRONTEND_URL + "/restriction");
          } else if (data.hes_code === "ACCEPTED") {
            if (data.is_driver === true) {
              localStorage.setItem("user_id", data.pk);
              window.location.replace(window.env.FRONTEND_URL + "/driver");
            } else {
              localStorage.setItem("user_id", data.pk);
              window.location.replace(window.env.FRONTEND_URL + "/traveller");
            }
          } else {
            localStorage.clear();
            window.location.replace(window.env.FRONTEND_URL + "/restriction");
          }
          setLoading(false);
        });
    }
  }, []);

  return <div id="dash">{loading === true && <Loading></Loading>}</div>;
};

export default Dashboard;
