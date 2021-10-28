import React, { useState, useEffect, Fragment } from 'react';

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace(window.env.FRONTEND_URL+'/login');
    } else {
      fetch(window.env.BACKEND_URL+'/api/v1/users/auth/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setUserEmail(data.email);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div id="dashboard">
      {loading === false && (
        <Fragment>
          <h1>Dashboard</h1>
          <h2>Hello {userEmail}!</h2>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
