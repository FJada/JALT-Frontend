import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import classes from '../../../global.module.css'
import axios from 'axios';

function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    account_id: '',
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
        console.log(response.data); // Adjust handling as per your needs
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
      {error && <div className="error-message">{error}</div>}
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
        <label>Account ID:</label>
        <input
          type="text"
          name="account_id"
          value={loginData.account_id}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleLogin} disabled={isLoading || !loginData.username || !loginData.account_id}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
}

export default Login;
