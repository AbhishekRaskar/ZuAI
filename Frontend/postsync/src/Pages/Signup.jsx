import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://zuai-be.onrender.com/users/register', {
        name,
        email,
        password
      });
      setSuccess('Signup successful!');
      setName('');
      setEmail('');
      setPassword('');
      setError('');
      navigate('/login');
    } catch (err) {
      setError('Signup failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="flex items-center justify-center h-200px bg-gray-100">
      <div className="bg-white p-5 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1" 
              placeholder="Enter your name" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1" 
              placeholder="Enter your email" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1" 
              placeholder="Enter your password" 
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <button 
            type="submit" 
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Signup
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?&nbsp;
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
