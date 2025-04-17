import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Closet from './Pages/Closet';
import AllClothes from './Pages/AllClothes';
//import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup/>}/>
        <Route path="home" element={<Home/>}/>
        <Route path="Closet" element={<Closet/>}/>
        <Route path="AllClothes" element={<AllClothes/>}/>

      </Routes>
    </Router>
  );
}

export default App;
