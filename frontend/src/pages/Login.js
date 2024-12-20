import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title.js'
//import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
      };
  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4" id='card-form'>
      <Title className="text-center mb-4" text1={"Login"}/>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control bg-transparent border border-secondary-subtle"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control bg-transparent border border-secondary-subtle"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary w-100">Login</button>
        </form>
        {error && <p className="text-danger text-center mt-3">{error}</p>}
        <hr />
        <div className="text-center">
          <p className="text-muted">Don't have an account? <a href="/register" className="text-decoration-none">Register here</a></p>
        </div>
      </div>
    </div>
);
};

export default Login;
