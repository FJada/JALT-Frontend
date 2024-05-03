import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate  } from 'react-router-dom';
import classes from '../../../global.module.css';
import axios from 'axios';

function User({}) {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Using useNavigate hook

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
    } else {
      const username = location.state ? location.state.username : null;
      if (username) {
        axios.get(`http://127.0.0.1:8000/users/${username}`)
          .then(response => {
            setUserData(response.data.Data);
            localStorage.setItem('userData', JSON.stringify(response.data.Data));
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      }
    }
  }, [location.state]);

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('userData');
    navigate('/login');
  };


  return (
    <div className={classes.text}>
      <div className={classes.title}>User Information</div>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          <p>Password: {userData.password}</p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default User;
