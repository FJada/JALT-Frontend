import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classes from '../../../global.module.css'
import axios from 'axios';


function User() {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const username = location.state.username;
    if (username) {
      axios.get(`http://127.0.0.1:8000/users/${username}`)
        .then(response => {
          setUserData(response.data.Data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [location.state.username]);

  return (
    <div className={classes.text}>
       <div className={classes.title}>User Information</div>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          <p>Password: {userData.password}</p>
        </div>
      )}
    </div>
  );
}

export default User;