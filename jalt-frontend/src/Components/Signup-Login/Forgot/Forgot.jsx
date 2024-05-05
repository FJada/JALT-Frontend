import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from '../../../global.module.css';
import axios from 'axios';

function Forgot() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleGetUser = () => {
        axios.get(`http://127.0.0.1:8000/users/${username}`)
            .then(response => {
                setUserData(response.data.Data);
                setErrorMessage('');
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
                setUserData(null);
            });
    };

    return (
        <div className={classes.text}>
            <div className={classes.title}>Forgot Password?</div>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
            />
            <button className={classes.btn} onClick={handleGetUser}>Retrieve User Details</button>
            {errorMessage && <p className={classes.error}>{errorMessage}</p>}
            {userData && (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>Password: {userData.password}</p>
                </div>
            )}
            <div>
        <span></span>
        <Link to="/Login">Login</Link>
      </div>

        </div>
    );
}

export default Forgot;
