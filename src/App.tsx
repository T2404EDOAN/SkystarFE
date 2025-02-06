import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Booking from './pages/Booking/Booking';
import Home from './pages/Home/Home';
import MainLayout from './layouts/MainLayout';
// ...other imports

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
