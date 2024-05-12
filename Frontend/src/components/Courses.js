import React, { useState, useEffect } from 'react';
import Course from './Course';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');
    const roles = JSON.parse(localStorage.getItem('roles'));

    console.log('User Access Token : ', accessToken);
    console.log('Username : ', username);
    console.log('User Roles List : ', roles);

    fetch('http://localhost:8000/api/course', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to authenticate user. Status: ' + response.status);
      }
    })
    .then((responseJson) => {
      console.log(responseJson);
      setCourses(responseJson);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  return (
    <div className="flex flex-col items-start mx-8 mb-8 space-y-3 mt-14">
      <h2 className="text-4xl font-bold capitalize">A board selection of courses</h2>
      <h3 className='capitalize'>Choose from 100,000 courses with new addition of publication</h3>
      <div className="w-full text-left border border-gray-300 p-7">
        <h2 className="mb-2 text-2xl font-bold text-slate-800">Expand Your Career Opportunities with the Edu Wave !</h2>
        <h3 className='text-center '>"Unlock your potential and embark on a transformative journey of knowledge and discovery with our comprehensive courses tailored to empower and inspire you every step of the way."</h3>
        <div className="flex flex-wrap justify-center gap-4 mt-2 lg:flex-none">
          {courses.map((course) => (
            <div className="m-2 h-60 w-60" key={course.id}>
              <Course course={course}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
