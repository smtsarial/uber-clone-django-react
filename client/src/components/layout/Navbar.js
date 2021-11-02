import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userType, setUserType] = useState("");
  const [userMail, setUserMail] = useState("");
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
          if(data.is_driver === false){
            setUserType("Traveller");
          }else{
            setUserType("Driver");
          }
        });
    }
  }, []);

  return (
    <nav id="navbar_campus_driver">
      <h1 style={{paddingLeft:'5px'}}>Campus Driver | {userType}</h1>
      {/*<h1 style={{}}>{userMail.charAt(0).toUpperCase() + userMail.slice(1)}</h1>*/}
      <h1 style={{}}>{userMail}</h1>
      <ul id="navbar_routes">
        {isAuth === true ? (
          <Fragment>
            {' '}
            <li>
              <Link className='link_nav' to='/dashboard'>Dashboard</Link>
            </li>
            <li>
              <Link className='link_nav' to='/logout'>Logout</Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            {' '}
            <li>
              <Link className='link_nav' to='/login'>Login</Link>
            </li>
            <li>
              <Link className='link_nav' to='/signup'>Signup</Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
