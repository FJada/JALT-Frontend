import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import classes from '../../../global.module.css'

function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Using useNavigate hook

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = () => {
    setIsLoading(true);
    axios
      .post('http://127.0.0.1:8000/users/login', loginData)
      .then((response) => {
        // Handle successful login
        console.log(response.data);navigate("/User", { state: { username: loginData.username, password: loginData.password } });
      })
      .catch((error) => {
        // Handle login error
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError('Failed to login. Please try again later.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={classes.text}>
      <div className={classes.title}>Login</div>
      {error && <div className={classes.error}>{error}</div>}
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
        />
      </div>
      <button className={classes.btn} onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <div>
        <span>Don't have an account? </span>
        <Link to="/Signup-Login">Sign-up</Link>
      </div>
      <div>
        <Link to="/Forgot">Forgot your password?</Link>
      </div>
    </div>
  );
}

export default Login;
