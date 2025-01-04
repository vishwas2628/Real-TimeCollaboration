import React from 'react'
import './App.css'
import {BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarHome from "./components/NavbarHome.js";
import LandingPage from "./pages/LandingPage.js";
import Register from "./pages/Registration.js";
import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js";
import AddDoc from "./pages/AddDoc.js";
import Document from "./pages/Document.js";
import NotFound from "./components/NotFound.js";

const App = () => {
  return (
      <BrowserRouter>
        <ToastContainer/>
        <NavbarHome/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/document/add" element={<AddDoc />} />
          <Route path="/document/:id" element={<Document />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
)}

export default App