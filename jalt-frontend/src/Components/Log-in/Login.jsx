import React from 'react';

function Login() {
    return(
        <div>
            <div>
            <label>Username:</label>
            <input
            type="text"
            name="username"
            />
        </div>
        <div>
            <label>Password:</label>
            <input
            type="text"
            name="password"
            />
        </div>
      </div>
    );
}

export default Login;