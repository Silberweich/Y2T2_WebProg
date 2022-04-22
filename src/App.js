import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserManagement from './Components/user-management';
import MovieManagement from './Components/movie/movie-management';
import Home from './Components/home';
import Nav from './Components/navbar';
import Footer from './Components/footer';
import Login from './Components/login';
import Movie from './Components/movie/movie';
import AddMovie from './Components/movie/addmovie';
import MovieUpdateForm from './Components/movie/movieUpdateForm';
import UserDetail from './Components/user';

function App() {
  return (
    <BrowserRouter className="min-vh-100 d-flex flex-column justify-content-between">
      <nav>
        {<Nav />}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminmovies" element={<MovieManagement />} />
        <Route path="/adminusers" element={<UserManagement />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route exact path="/movie/:movie_ID" element={<Movie />} />
        <Route exact path="/movie/:movie_ID/edit" element={<MovieUpdateForm />} />
        <Route exact path="/user/:email" element={<UserDetail />} />
      </Routes>
        {<Footer />}
    </BrowserRouter>
  );
}

export default App;
