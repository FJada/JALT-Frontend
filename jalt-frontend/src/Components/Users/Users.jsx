import React from 'react';
import './users.css'; 

function Users({ username }) {
  return (
    <div className="text">
      <h1>Hello, {username}</h1>
      <p>This is your account page.</p>
    </div>
  );
}

export default Users;
