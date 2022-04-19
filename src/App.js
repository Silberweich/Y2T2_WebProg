import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserManagement from './Components/user-management';
import Home from './Components/home';
import Nav from './Components/navbar';
import Login from './Components/login';

function App() {
  return (
    <BrowserRouter>
      <nav>
        {<Nav/>}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminmovies" element={<Home />} />
        <Route path="/adminusers" element={<UserManagement />} />
        <Route path="/adminlogin" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
