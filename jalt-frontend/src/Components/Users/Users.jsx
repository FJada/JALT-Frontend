import React, {useState, useEffect} from 'react';
import './users.css'; 
import axios from 'axios';

function Users({ username }) {

  const [error, setError] = useState('Below is our list of users fetched from our API Server:');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newUserData, setNewUserData] = useState({
    username: '',
    account_id: '',
  });


  useEffect(()=>{
    fetchUsers();
  }, []);


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
  

  return (
    <div className="text">
      <h1>Hello, {username}</h1>
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

      <button onClick={addUser} disabled={isLoading}>
        {isLoading ? 'Adding User...' : 'Add User'}
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
