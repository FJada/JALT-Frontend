import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importing useNavigate
import classes from '../../global.module.css';
import axios from 'axios';

function Signup() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newUserData, setNewUserData] = useState({
    username: '',
    account_id: '',
  });
  const navigate = useNavigate(); // Using useNavigate hook

  const addUser = () => {
    setIsLoading(true);
    axios
      .post('http://127.0.0.1:8000/add_user', {
        username: newUserData.username,
        account_id: newUserData.account_id,
      })
      .then(() => {
        setError('User added successfully');
        setNewUserData({ username: '', account_id: '' });
        // Redirect to the /Users page after successful signup
        navigate("/Users"); // Using navigate() to redirect
      })
      .catch(() => {
        setError('Failed to add user');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChangeCreateAccount = (event) => {
    const { name, value } = event.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  return (
    <div className={classes.text}>
      <div className={classes.title}>Create Account</div>
      {error && <div className="error-message">{error}</div>}
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={newUserData.username}
          onChange={handleInputChangeCreateAccount}
        />
      </div>
      <div>
        <label>Account ID:</label>
        <input
          type="text"
          name="account_id"
          value={newUserData.account_id}
          onChange={handleInputChangeCreateAccount}
        />
      </div>
      <button
        className={classes.btn}
        onClick={addUser}
        disabled={isLoading || !newUserData.username || !newUserData.account_id}
      >
        {isLoading ? 'Adding User...' : 'Create Account'}
      </button>
      <div>
        <span>Already have an account? </span>
        <Link to="/Login">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
