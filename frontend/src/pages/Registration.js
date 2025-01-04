import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'
import Title from '../components/Title.js';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;


  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post('http://localhost:8080/api/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      navigate('/login'); // Redirect to login if registration is successful
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Set error message if registration fails
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };
  useEffect(() => {
    if (user) {
      toast.error("already login");
      navigate('/dashboard')
    }
  }, [user])

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        height: '80vh',
      }}
    >
      <div
        className="card shadow-lg p-4" id='card-form'>
        <Title className="text-center mb-4" text1={"Sign"} text2={"Up"} />
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Username</label>
            <input
              type="text"
              className="form-control bg-transparent border border-secondary-subtle"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
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
              placeholder="Create a password"
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary w-100">Register</button>
        </form>
        {error && <p className="text-danger text-center mt-3">{error}</p>}
        <hr />
        <div className="text-center">
          <p className="text-muted">Already have an account? <a href="/login" className="text-decoration-none">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;