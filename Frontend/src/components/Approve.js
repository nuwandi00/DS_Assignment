import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Approve() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const roles = JSON.parse(localStorage.getItem('roles'));
    
        console.log('User Access Token : ', accessToken);
        console.log('User Roles List : ', roles);

        const adminNumber = 5150; // assuming 1984 is the faculty role number
        if (roles && roles.includes(adminNumber)) {
            setIsAdmin(true);
        }
    
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
            responseJson.map(course => {
                const courseId = course._id;
                const courseFee = course.courseFee;
                const code = course.code;
                const name = course.name;
                
                localStorage.setItem('courseId', courseId);
                localStorage.setItem('courseFee', courseFee);
                localStorage.setItem('code', code);
                localStorage.setItem('name', name);
            });
            setCourses(responseJson);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, []);

    const handleSubmit = (courseId) => {
        const accessToken = localStorage.getItem('accessToken');
        const roles = JSON.parse(localStorage.getItem('roles'));
        const adminNumber = 5150;
        const status = "Accept";
        const code = localStorage.getItem('code');
    
        console.log(accessToken);
        console.log(roles);
    
        if (roles && roles.includes(adminNumber)) {
            axios.post('http://localhost:8000/api/approve', {
                status: status, // Include status in the request body
                code: code,     // Include code in the request body
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then(response => {
                console.log('Course Approved Successfully');
                console.log(response.data);
                // Remove the approved course from the state
                setCourses(prevCourses => prevCourses.filter(course => course._id !== courseId));
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            console.log('Only faculty users are allowed to create courses.');
        }
    };
    

  return (
    <>
        {isAdmin ? (
            <div className="flex flex-col mt-2 lg:flex-none">
                <table className="m-4 mt-10 bg-slate-100">
                    <thead>
                    <tr>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-700">Name</th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-700">Course Fee</th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-700">Course Code</th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-700">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.map((course) => (
                        <tr key={course._id}>
                            <td className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap">{course.name}</td>
                            <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">${course.courseFee}</td>
                            <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">{course.code}</td>
                            <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                <button className="mr-40 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900" onClick={() => handleSubmit(course._id)}>Approve</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            ) : (
            <div className="flex items-center justify-center h-screen font-bold text-center text-slate-100 bg-slate-800">
                <div>
                    <h1 className='mt-4 text-6xl'>Only Administrators are allowed to Access this Page.</h1>
                </div>
            </div>
        )}
        </>
    );
}

export default Approve;
