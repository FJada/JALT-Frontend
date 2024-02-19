import React, {useState, useEffect} from 'react';
import classes from '../../global.module.css'
import axios from 'axios';

function Users({ username }) {

  const [error, setError] = useState('Below is our list of users fetched from our API Server:');
  const [users, setUsers] = useState([]);

  useEffect(
    () => {
      axios.get('http://127.0.0.1:8000/users')
      .then((response)=>{
        const usersObject = response.data.Data;
        const keys = Object.keys(usersObject);
        const usersArray = keys.map((key) => usersObject[key]);
        setUsers(usersArray);
      }) // retrieves users
      .catch(() =>{setError('Something went wrong'); });

    },
    [],
  );
  return (
    <div className={classes.text}>
      <div className={classes.title}>Hello, {username} </div>
      <p>This is your account page.</p>
      {error && (<div className='error-message'>
        {error}
        </div> 
        )}
      {users.map((user) => (
        <div className='user-container'>
          <h2>{user.username}</h2>
          </div>

      ))}
      
    </div>
  );
}

export default Users;
