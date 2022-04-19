import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserManagement from './Components/user-management';
import MovieManagement from './Components/movie-management';
import Home from './Components/home';
import Nav from './Components/navbar';
import Login from './Components/login';
import Movie from './Components/movie';

function App() {
  return (
    <BrowserRouter>
      <nav>
        {<Nav />}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminmovies" element={<MovieManagement />} />
        <Route path="/adminusers" element={<UserManagement />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route exact path="/movie/:id" element={<Movie item={{movie: "avengers"}}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
