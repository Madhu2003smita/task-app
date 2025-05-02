import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import api from '../api/api';

function SignupForm() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/user', user);
      alert('Signup successful');
      setUser({ username: '', email: '', password: '' });
      navigate('/login'); 
    } catch (error) {
      console.log('error:', error);
      alert('Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <label className="block mb-2 text-gray-700 font-medium">
          Name
        </label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block mb-2 text-gray-700 font-medium">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block mb-2 text-gray-700 font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
