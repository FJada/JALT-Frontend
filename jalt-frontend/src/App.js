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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Edges 
        leftImage="./Images/seats.jpg" 
        rightImage="./Images/tunnel.jpg"  
      />
      <Routes>
        <Route path ="" element ={<div className="title">Home</div>}/>
        <Route path="trains" element={<Trains />} />
        <Route path="buses" element={<Buses />} />
        <Route path="users" element={<Users username="y/n" />} />    
      </Routes>
    </BrowserRouter>
  );
}

export default App;