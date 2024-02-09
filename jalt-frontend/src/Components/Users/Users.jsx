import React from 'react';

function Users({ username }) {
  return (
    <div>
      <h1>Hello, {username}</h1>
      <p>This is your account page.</p>
    </div>
  );
}

export default Users;
