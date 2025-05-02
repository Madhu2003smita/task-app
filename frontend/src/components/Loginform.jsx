import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

function Loginform() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  let navigate = useNavigate();

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
      let res = await api.post('/login', user);
      let token = res.data.token;
      console.log(token);

      localStorage.setItem('token', token);
      alert('Login successful');
      navigate('/dashboard');
    } catch (error) {
      console.log('error:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <label className="block mb-2 text-gray-700 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block mb-2 text-gray-700 font-semibold">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Loginform;
