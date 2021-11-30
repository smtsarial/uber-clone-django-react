import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userfirstname, setUserfirstname] = useState("");
  const [userlastname, setUserlastname] = useState("");
  const [useremail, setUseremail] = useState("");
  const [username, setUsername] = useState("");
  const [userdriver, setUserdriver] = useState("");
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
          console.log(data);
          setUseremail(data.email);
          setUserfirstname(data.first_name);
          setUsername(data.username);
          setUserlastname(data.last_name);
          setUserdriver(data.driver);
          setLoading(false);
        });
    }
  }, []);

  if (loading === true) {
    return <Loading></Loading>;
  } else if (loading === false) {
    return (
      <div id="settings">
        <div className="settings-form-card">
          <h1>Account Information</h1>
          
          <form className="settings-form">
            <label>
              First Name
              <div>
                <input
                  type="text"
                  name="firstname"
                  placeholder={userfirstname}
                  disabled
                />
              </div>
            </label>
            <label>
              Last Name
              <div>
                <input
                  type="text"
                  name="lastname"
                  placeholder={userlastname}
                  disabled
                />
              </div>
            </label>
            <label>
              Email
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder={useremail}
                  disabled
                />
              </div>
            </label>
            <label>
              Username
              <div>
                <input
                  type="username"
                  name="username"
                  placeholder={username}
                  disabled
                />
              </div>
            </label>
            <input type="submit" value="Save Account Information" />
          </form>
          <div>
            <p>or</p>
            <Link className="link_nav" to="/logout">
              <p>Logout</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
