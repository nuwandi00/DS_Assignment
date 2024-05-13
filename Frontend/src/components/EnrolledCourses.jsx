import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
    
        // if (!token) {
        //   // Redirect to login if token is not present
        //   navigate("/login");
        //   return;
        // }

        setUsername(username);
        console.log(token);
        console.log(username);
    
        const headers = {
          Authorization: `Bearer ${token}`,
        };
    
        const response = await axios.get(`http://localhost:8000/api/auth/modules?username=${username}`);
        console.log(response);
    
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message); // Log the error message
      }
    };

    fetchData();
  }, [navigate]);
  const navigateToHome = () => {
    navigate("/Home");
  };
  const navigateToRemove = () => {
    navigate("/removec");
  };
  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-bold text-center">Enrolled Courses</h1>
      <h1 className="mb-4 text-2xl font-bold text-center">Welcome {username} </h1>
      <p>Hera are Your Courses</p>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {courses.map((course, index) => (
          <li key={index} className="p-4 bg-gray-200 rounded-md">
            <p className="text-lg font-semibold">{course}</p> {/* Adjust this line based on your response structure */}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between mt-4 ml-[1300px] lg:flex-none">
                    <button className="w-48 p-2 text-sm font-medium text-gray-100 hover:text-gray-100 focus:outline-none focus:text-gray-900 bg-cyan-700" onClick={navigateToRemove}>Remove Course</button>
                </div>
      <div className="flex items-center justify-between mt-4 ml-[1300px] lg:flex-none">
                    <button className="w-48 p-2 text-sm font-medium text-gray-100 hover:text-gray-100 focus:outline-none focus:text-gray-900 bg-cyan-700" onClick={navigateToHome}>Back to home</button>
                </div>
    </div>
  );
};

export default EnrolledCourses;
