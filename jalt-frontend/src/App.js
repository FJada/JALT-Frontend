import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar';
import Edges from './Components/Edges';
import Trains from './Components/Trains';
import Users from './Components/Users';
import Buses from './Components/Buses';
import Map from './Components/Map';
import Login from './Components/Login';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Edges 
        leftImage="./Images/seats.jpg" 
        rightImage="./Images/tunnel.jpg"  
      />

      <Routes>
        <Route path ="Home" element ={<Map />}/>  
        <Route path="Trains" element={<Trains />} />
        <Route path="Buses" element={<Buses />} />
        <Route path="Users" element={<Users username="y/n" />} />   
        <Route path="Login" element={<Login />}/> 
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;