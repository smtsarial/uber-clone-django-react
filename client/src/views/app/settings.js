import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userpk, setUserpk] = useState("");
  const [userfirstname, setUserfirstname] = useState("");
  const [userlastname, setUserlastname] = useState("");
  const [useremail, setUseremail] = useState("");
  const [username, setUsername] = useState("");
  const [userdriver, setUserdriver] = useState(false);
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
          //console.log(data);
          setUseremail(data.email);
          setUserpk(data.pk);
          setUserfirstname(data.first_name);
          setUsername(data.username);
          setUserlastname(data.last_name);
          setUserdriver(data.driver);
          setLoading(false);
        });
    }
  }, []);

  const handleChangeUserInfo = (event) => {
    console.log(userdriver);
    if (localStorage.getItem("token") === null) {
      window.location.replace(window.env.FRONTEND_URL + "/login");
    } else {
      fetch(window.env.BACKEND_URL + "/api/v1/users/setting/" + userpk, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          pk: userpk,
          email: useremail,
          is_driver: Boolean(userdriver),
          username: username,
          first_name: userfirstname,
          last_name: userlastname,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  /////////////////
  const handleUserTypeChange = (event) => {
    if (event.target.value === "true") {
      setUserdriver(true);
    } else {
      setUserdriver(false);
    }
  };
  ////////////////
  if (loading === true) {
    return <Loading></Loading>;
  } else if (loading === false) {
    return (
      <div id="settings">
        <div className="settings-form-card">
          <h1>Account Information</h1>

          <form className="settings-form">
            <label>
              ID
              <div>
                <input type="text" name="pk" placeholder={userpk} disabled />
              </div>
            </label>
            <label>
              First Name
              <div>
                <input
                  type="text"
                  name="firstname"
                  placeholder={userfirstname}
                  value={userfirstname}
                  onChange={(e) => setUserfirstname(e.target.value)}
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
                  value={userlastname}
                  onChange={(e) => setUserlastname(e.target.value)}
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
                  value={useremail}
                  onChange={(e) => setUseremail(e.target.value)}
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </label>
            <label>
              User Type
              <div>
                <select value={toString(userdriver)} onChange={handleUserTypeChange}>
                  <option value="true">Driver</option>
                  <option value="false">Traveller</option>
                </select>
              </div>
            </label>
            <input
              type="submit"
              value="Save Account Information"
              onClick={handleChangeUserInfo}
            />
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
