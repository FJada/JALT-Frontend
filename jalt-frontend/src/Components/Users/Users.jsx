import React, {useState, useEffect} from 'react';
import classes from '../../global.module.css'
import axios from 'axios';

function Users({ username }) {

  const [error, setError] = useState('Below is our list of users fetched from our API Server:');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newUserData, setNewUserData] = useState({
    username: '',
    account_id: '',
  });
  const [deleteUsername, setDeleteUsername] = useState('');

  const fetchUsers = () => {
      axios.get('http://127.0.0.1:8000/users')
      .then((response)=>{
        const usersObject = response.data.Data;
        const keys = Object.keys(usersObject);
        const usersArray = keys.map((key) => usersObject[key]);
        setUsers(usersArray);
      }) // retrieves users
      .catch(() =>{setError('Something went wrong'); });

    };

  const addUser = () => {
      setIsLoading(true);
      axios.post('http://127.0.0.1:8000/add_user', {
        username: newUserData.username,
        account_id: newUserData.account_id,
      })
        .then(() => {
          // Once user is added successfully, fetch updated user list
          fetchUsers();
          setNewUserData({ username: '', account_id: '' });
        })
        .catch(() => {
          setError('Failed to add user');
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
  
  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewUserData({ ...newUserData, [name]: value });
    };
  
  const deleteUser = () => {
    setIsLoading(true);
    axios.delete(`http://127.0.0.1:8000/users/delete/${deleteUsername}`)
    .then(() => {
      // Once user is deleted successfully, fetch updated user list
      fetchUsers();

    })
    .catch(() => {
      setError('Failed to delete user');
    })
    .finally(() => {
      setIsLoading(false);
    });

  };

  return (
    <div className={classes.text}>
      <div className={classes.title}>Hello, {username} </div>
      <p>This is your account page.</p>
      {error && (<div className='error-message'>
        {error}
        </div> 
        )}
    
    <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={newUserData.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Account ID:</label>
        <input
          type="text"
          name="account_id"
          value={newUserData.account_id}
          onChange={handleInputChange}
        />
      </div>

      <button className={classes.btn} onClick={addUser} disabled={isLoading}>
        {isLoading ? 'Adding User...' : 'Add User'}
      </button>
      
      <button className={classes.btn} onClick={fetchUsers}>Fetch Users</button>


      <div>
        <label>Username to Delete:</label>
        <input
          type="text"
          value={deleteUsername}
          onChange={(e) => setDeleteUsername(e.target.value)}
        />
      </div>

      <button className={classes.btn} onClick={deleteUser} disabled={isLoading}>
      {isLoading ? 'Deleting User...' : 'Delete User'}
      </button>

      {users.map((user) => (
        <div className='user-container'>
          <h2>{user.username}</h2>
          </div>
      ))}
      
    </div>
  );
}

export default Users;
