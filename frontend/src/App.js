import React from 'react'
import './App.css'
import {BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarHome from "./components/NavbarHome.js";
import LandingPage from "./pages/LandingPage.js";
import Register from "./pages/Registration.js";
import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js";
import AddDoc from "./pages/AddDoc.js";
import Update from "./pages/Update.js";
import Document from "./pages/Document.js";
import NotFound from "./components/NotFound.js";

const App = () => {
  return (
      <BrowserRouter>
        <NavbarHome/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddDoc />} />
          <Route path="/update" element={<Update />} />
          <Route path="/doc/:docId" element={<Document />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
)}

export default App