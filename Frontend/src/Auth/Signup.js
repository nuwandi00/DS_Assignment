import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  // Usage of States
  const [error, setError] = useState('')
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');

  // handleSubmit function to handle signup functionality
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      if (user === '' || pwd === '' || email === '') {
        console.log('Please enter required credentials');
        setError('Please Enter required Credentials');
      } else {
        const response = await axios.post('http://localhost:8000/register', {user: user, pwd: pwd, email: email});
        console.log('User Response : ', response.data);
        navigate('/');
      }
    } catch (error) {
      if (!error?.response) {
        setError('No Server Response')
      } else if (error.response?.status === 409) {
        setError('User Credentials are already Taken');
      } else {
        setError('Registration Failed');
      }
    }
  }
  return (
    <div className='flex w-full h-screen'>
      <div className='flex items-center justify-center w-full lg:w-1/2'>
        <div className='px-10 py-20 bg-white border-2 border-gray-200 rounded-3xl'>
          <h1 className='text-5xl font-semibold'>Create an Account</h1>
          <p className='mt-4 text-lg font-medium text-gray-500'>StarMap Navigator - Wonders of Space Await !</p>
          <div className='mt-8'>
            <div>
              <label className='text-lg font-medium' htmlFor="user">Username</label>
              <input 
                type="text" 
                className='w-full p-4 mt-1 bg-transparent border-2 border-gray-100 rounded-xl'
                placeholder='Enter your username'
                id='user'
                required
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            {error && <p className="mt-4 text-sm text-center text-red-500 error md:text-center">{error}</p>}

            <div>
              <label className='text-lg font-medium' htmlFor="email">Email</label>
              <input 
                type="text" 
                className='w-full p-4 mt-1 bg-transparent border-2 border-gray-100 rounded-xl'
                placeholder='Enter your email'
                id='email'
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error && <p className="mt-4 text-sm text-center text-red-500 error md:text-center">{error}</p>}

            <div>
              <label className='text-lg font-medium' htmlFor="pwd">Password</label>
              <input 
                type="password" 
                className='w-full p-4 mt-1 bg-transparent border-2 border-gray-100 rounded-xl'
                placeholder='Enter your password'
                id='pwd'
                required
                onChange={(e) => setPwd(e.target.value)}
              />
            </div>
            {error && <p className="mt-4 text-sm text-center text-red-500 error md:text-center">{error}</p>}

            <div className='flex flex-col mt-8 gap-y-4'>
              <button className=' active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all text-white py-3 rounded-xl bg-blue-900 text-lg font-bold' onClick={handleSubmit}>Sign Up</button>
            </div>
            <div className='flex items-center justify-center mt-8'>
              <p className='text-base font-medium'>Already have an account?</p>
              <button className='ml-2 text-base font-medium text-blue-900 underline'><Link to='/'>Sign In</Link></button>
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

export default Register