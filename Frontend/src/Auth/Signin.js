import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  // Navigation Part
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "Home";

  // Usage of States
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');

  // handleSubmit function to handle user login functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (user === '' || pwd === '') {
        console.log('Please Enter required credentials');
        setError('Please Enter required Credentials')
      } else {
        const response = await axios.post('http://localhost:8000/login', { user: user, pwd: pwd });
  
        // User details
        const accessToken = response.data.accessToken;
        const userData = response.data;
        const roles = userData.roles;
        const username = userData.user;

        // Set user data to the local storage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('username', username);
        localStorage.setItem('roles', JSON.stringify(roles));
    
        console.log('User login successful:', userData);
        console.log('Username:', username);
        console.log('Access Token:', accessToken);
        console.log('User role', roles);
        
        setUser('');
        setPwd('');
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (error.response) {
        setError('User Login Failed');
      } else if (error.request) {
        setError('Network Error: Please check your internet connection.');
      } else {
        setError('Unexpected Error: Please try again later.');
      }
    }
  }
    
  return (
    <div className='flex w-full h-screen'>
      <div className='flex items-center justify-center w-full lg:w-1/2'>
        <div className='px-10 py-20 bg-white border-2 border-gray-200 rounded-3xl'>
          <h1 className='text-5xl font-semibold'>Welcome Back</h1>
          <p className='mt-4 text-lg font-medium text-gray-500'>Welcome back! Please enter your details.</p>
          <div className='mt-8'>
            <div>
              <label className='text-lg font-medium' htmlFor="user">Username</label>
              <input 
                type="text" 
                className='w-full p-4 mt-1 bg-transparent border-2 border-gray-100 rounded-xl'
                placeholder='Enter your username'
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                id='user' 
              />
            </div>
            {error && <p className="mt-4 text-sm text-center text-red-500 error md:text-center">{error}</p>}

            <div>
              <label className='text-lg font-medium' htmlFor="pwd">Password</label>
              <input 
                type="password" 
                className='w-full p-4 mt-1 bg-transparent border-2 border-gray-100 rounded-xl'
                placeholder='Enter your password'
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                id='pwd'
                required
              />
            </div>
            {error && <p className="mt-4 text-sm text-center text-red-500 error md:text-center">{error}</p>}

            <div className='flex flex-col mt-8 gap-y-4'>
              <button className=' active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all text-white py-3 rounded-xl bg-blue-900 text-lg font-bold' onClick={handleSubmit}>Sign In</button>
            </div>
            <div className='flex items-center justify-center mt-8'>
              <p className='text-base font-medium'>Don't have an account?</p>
              <button className='ml-2 text-base font-medium text-blue-900 underline'><Link to='Signup'>Sign Up</Link></button>
            </div>
          </div>
        </div>
      </div>
      <div className='relative items-center justify-center hidden w-1/2 h-full bg-gray-200 lg:flex'>
        <div className='rounded-full w-60 h-60 bg-gradient-to-tr from-blue-900 to-blue-400 animate-bounce'></div>
        <div className='absolute bottom-0 w-full h-1/2 bg-white/10 backdrop-blur-lg'></div>
      </div>
    </div>
  )
}

export default Login