import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsAuth(true);
    }
  }, []);

  return (
    <nav id="navbar_campus_driver">
      <h1 style={{paddingLeft:'20px'}}>Campus Driver</h1>
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
