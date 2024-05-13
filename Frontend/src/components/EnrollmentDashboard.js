import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CourseDashboard() {
    const [isFaculty, setIsFaculty] = useState(false);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const roles = JSON.parse(localStorage.getItem('roles'));
    
        console.log('User Access Token : ', accessToken);
        console.log('User Roles List : ', roles);

        const facultyRoleNumber = 1984; // assuming 1984 is the faculty role number
        if (roles && roles.includes(facultyRoleNumber)) {
            setIsFaculty(true);
        }
    
        fetch('http://localhost:8000/enroll/api/cen', {
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
                const enrollmentId = course._id;
                const code = course.code;
                const name = course.name;
                
                localStorage.setItem('courseId', enrollmentId);
                localStorage.setItem('code', code);
                localStorage.setItem('name', name);
            });
            setCourses(responseJson);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, []);

    const deleteCourse = () => {
        const facultyRoleNumber = 1984;
        const accessToken = localStorage.getItem('accessToken');
        const roles = JSON.parse(localStorage.getItem('roles'));
        const id = localStorage.getItem('courseId');
    
        if (roles && roles.includes(facultyRoleNumber)) {
            const confirmation = window.confirm("Do you want to delete this course?");
            if (confirmation) {
                axios.delete('http://localhost:8000/enroll/api/cen', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    data: { id: id }
                })
                .then((res) => {
                    console.log('Course deleted successfully');
                    console.log(res);
                    window.location.reload();
                })
                .catch((err) => {
                    console.error('Error deleting course:', err);
                });
            }
        } else {
            console.log('Only faculty users are allowed to delete courses.');
        }
    };
    

      const navigateToForm = () => {
        navigate("/ecreate");
      };
      const navigateToModules = () => {
        navigate("/courseenroll");
      };
      const navigateToHome = () => {
        navigate("/Home");
      };
      const navigateToRemove = () => {
        navigate("/removeeba");
      };

  return (
    <>
        {isFaculty ? (
            <div className="flex flex-col mt-2 lg:flex-none">
                <div className="flex items-center justify-between mt-4 ml-[1300px] lg:flex-none">
                    <button className="w-48 p-2 text-sm font-medium text-gray-100 hover:text-gray-100 focus:outline-none focus:text-gray-900 bg-cyan-700" onClick={navigateToForm}>Create Enrollment</button>
                </div>
                <div className="flex items-center justify-between mt-4 ml-[1300px] lg:flex-none">
                    <button className="w-48 p-2 text-sm font-medium text-gray-100 hover:text-gray-100 focus:outline-none focus:text-gray-900 bg-cyan-700" onClick={navigateToModules}>Enroll in to Courses</button>
                </div>
                <div className="flex items-center justify-between mt-4 ml-[1300px] lg:flex-none">
                    <button className="w-48 p-2 text-sm font-medium text-gray-100 hover:text-gray-100 focus:outline-none focus:text-gray-900 bg-cyan-700" onClick={navigateToRemove}>Remove Enrolled Users</button>
                </div>
                <table className="m-4 mt-10 bg-slate-100">
                    <thead>
                    <tr>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-700">Name</th>
                    
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-700">Course Code</th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-700">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                        <td className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap">{course.name}</td>
                        
                        <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">{course.code}</td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            <button className="mr-40 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900">Update</button>
                            <button className="text-sm font-medium text-red-700 hover:text-red-900 focus:outline-none focus:text-red-900" onClick={deleteCourse}>Delete</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex items-center justify-between mt-4 ml-[1300px] lg:flex-none">
                    <button className="w-48 p-2 text-sm font-medium text-gray-100 hover:text-gray-100 focus:outline-none focus:text-gray-900 bg-cyan-700" onClick={navigateToHome}>Back to home</button>
                </div>
            </div>
            ) : (
            <div className="flex items-center justify-center h-screen font-bold text-center text-slate-100 bg-slate-800">
                <div>
                    <h1 className='mt-4 text-6xl'>Only Instructors are allowed to Access this Page.</h1>
                </div>
                <div className=" ">
                    <button className="w-48 p-2 text-sm font-medium text-gray-100 hover:text-gray-100 focus:outline-none focus:text-gray-900 bg-cyan-700" onClick={navigateToHome}>Back to home</button>
                </div>
            </div>
        )}
        </>
        );
}

export default CourseDashboard
