import React, { useState } from 'react';
import Title from '../components/Title.js';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleRegister = async (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        height: '80vh',
      }}
    >
      <div
        className="card shadow-lg p-4" id='card-form'>
        <Title className="text-center mb-4" text1={"Sign"} text2={"Up"}/>
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