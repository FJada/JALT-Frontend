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
import Buses from './Components/Buses';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path ="" element ={<h1 className="text">Home</h1>}/>
        <Route path="trains" element={<Trains />} />
        <Route path="trains" element={<Buses />} />
        <Route path="users" element={<Users username="y/n" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;