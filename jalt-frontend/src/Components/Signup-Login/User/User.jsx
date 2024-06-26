import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate  } from 'react-router-dom';
import classes from '../../../global.module.css';
import axios from 'axios';

function User({}) {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Using useNavigate hook
  const [newUsername, setNewUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


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

  const handleUpdateUsername = () => {
    // Reset error message
    setErrorMessage('');
  
    // Validate new username
    if (!newUsername.trim()) {
      setErrorMessage('New username cannot be empty.');
      return; // Exit function early if new username is empty
    }
  
    if (newUsername.trim() === userData.username) {
      setErrorMessage('New username cannot be the same as the current username.');
      return; // Exit function early if new username is the same as current username
    }
  
    // Make a request to update the username
    axios.post('http://127.0.0.1:8000/users/update_username', {
      username: userData.username,
      new_username: newUsername
    })
      .then(response => {
        console.log(response.data.message); // Handle success message
        // Optionally, update the user data in the state
        setUserData(prevUserData => ({ ...prevUserData, username: newUsername }));
        // Clear the input field
        setNewUsername('');
      })
      .catch(error => {
        console.error('Error updating username:', error); // Handle error
        // Set error message
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div className={classes.text}>
      <div className={classes.title}>User Information</div>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          <p>Password: {userData.password}</p>
          <input
            type="text"
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
            placeholder="Enter new username"
          />
          <button className={classes.btn} onClick={handleUpdateUsername}>Update Username</button>
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
        </div>
      )}
      <button className={classes.btn} onClick={handleLogout}>Logout</button>
    </div>
  );
}
export default User;