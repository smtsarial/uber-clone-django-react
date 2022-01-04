import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import BurgerMenu from "./burger";
import { v4 as uuidv4 } from "uuid";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userType, setUserType] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userBudget, setUserBudget] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setUserType("");
      setUserMail("Welcome");
    } else {
      setIsAuth(true);
      fetch(window.env.BACKEND_URL + "/api/v1/users/auth/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserMail(data.email);
          setUserBudget(data.balance);
          if (data.is_driver === false) {
            setUserType("Traveller");
          } else {
            setUserType("Driver");
          }
        });
    }
  }, []);

  
    if(userType === 'Driver'){
      return(<nav id="navbar_campus_driver">
      <Link className="link_nav" to="/dashboard">
        <h1 id="navbar-title" style={{ paddingLeft: "5px" }}>
          Campus Driver | {userType}
        </h1>
      </Link>
      {/*<h1 style={{}}>{userMail.charAt(0).toUpperCase() + userMail.slice(1)}</h1>*/}
      <h3 id="user-navbar-email" style={{}}>
        <b>
          {userMail}
        </b>
      </h3>

      <ul id="navbar_routes">
        {isAuth === true ? (
          <Fragment>
            {" "}
            <li>
              <Link className="link_nav" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li style={{ marginRight: "" }}>
              <Link className="link_nav" to="/car-pooling">
                Car Pooling
              </Link>
            </li>
            <li style={{ marginRight: "" }}>
              <Link className="link_nav" to="/settings">
                Settings
              </Link>
            </li>
            <li>
              <div>
                <BurgerMenu key={uuidv4()}></BurgerMenu>
              </div>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            {" "}
            <li>
              <Link className="link_nav" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="link_nav" to="/signup">
                Signup
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>);
    }else{
      return (<nav id="navbar_campus_driver">
      <Link className="link_nav" to="/dashboard">
        <h1 id="navbar-title" style={{ paddingLeft: "5px" }}>
          Campus Driver | {userType}
        </h1>
      </Link>
      {/*<h1 style={{}}>{userMail.charAt(0).toUpperCase() + userMail.slice(1)}</h1>*/}
      <h3 id="user-navbar-email" style={{}}>
        <b>
          {userMail}
        </b>
      </h3>

      <ul id="navbar_routes">
        {isAuth === true ? (
          <Fragment>
            {" "}
            <li>
              <Link className="link_nav" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li style={{ marginRight: "" }}>
              <Link className="link_nav" to="/car-pooling">
                Car Pooling
              </Link>
            </li>
            <li style={{ marginRight: "" }}>
              <Link className="link_nav" to="/shuttles">
                Shuttles
              </Link>
            </li>
            <li style={{ marginRight: "" }}>
              <Link className="link_nav" to="/settings">
                Settings
              </Link>
            </li>
            <li>
              <div>
                <BurgerMenu key={uuidv4()}></BurgerMenu>
              </div>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            {" "}
            <li>
              <Link className="link_nav" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="link_nav" to="/signup">
                Signup
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>);
    }
  
};

export default Navbar;
