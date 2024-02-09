import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar';
import Trains from './Components/Trains';
import Users from './Components/Users';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path = "" element ={<h1>Home</h1>}/>
        <Route path="trains" element={<Trains />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;