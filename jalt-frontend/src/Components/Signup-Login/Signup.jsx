import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importing useNavigate
import classes from '../../global.module.css';
import axios from 'axios';

function Signup() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newUserData, setNewUserData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate(); // Using useNavigate hook

  const addUser = () => {
    setIsLoading(true);
    axios.post('http://127.0.0.1:8000/add_user', {
      username: newUserData.username,
      password:  ''
    })
    .then((response) => {
      setError('User added successfully');
      setNewUserData({ username: '', password: '' });
      // Redirect to the /User page after successful signup
      navigate("/User", { state: { username: newUserData.username, password: newUserData.password } });
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
    if (name === 'username') {
      setNewUserData({ ...newUserData, username: value });
    }
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
      <button
        className={classes.btn}
        onClick={addUser}
        disabled={isLoading || !newUserData.username}

      >
        {isLoading ? 'Adding User...' : 'Create Account'}
      </button>
      <div>
        <span>Already have an account? </span>
        <Link to="/Login">Login</Link>
      </div>
      <div>
        <Link to="/Forgot">Forgot your password?</Link>
      </div>
    </div>
  );
}

export default Signup;
