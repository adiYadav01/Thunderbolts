// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Chat from "./pages/Chat";
import { auth } from "./firebase/firebaseconfig";   
import './index.css';
import DecryptionPage from "./pages/DecryptionPage";
import Header from './components/Header';
import Profile from "./pages/profile";
import About from "./pages/about";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} /> {/* Add the Chat route */}
        <Route path="/decryption" element={<DecryptionPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
