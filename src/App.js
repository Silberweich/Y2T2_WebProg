import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserManagement from './Components/user-management';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserManagement />} />
        <Route path="/user" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
