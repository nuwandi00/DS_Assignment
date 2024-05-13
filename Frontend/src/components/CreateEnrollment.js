import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function EnrollmentForm() {
  const [enrollmentData, setCourseData] = useState({
    code: ''
  });

  const [isFaculty, setIsFaculty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const roles = JSON.parse(localStorage.getItem('roles'));

    console.log(accessToken);
    console.log(roles);

    const facultyRoleNumber = 1984; // assuming 1984 is the faculty role number
    if (roles && roles.includes(facultyRoleNumber)) {
      setIsFaculty(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...enrollmentData, [name]: value });
  };

  const [codeError, setCodeError] = useState("");

  const validationForm = () => {
    let valid = true;

    if (enrollmentData.code === '') {
      setCodeError("Please Enter the Course Code");
      valid = false;
    } else {
      setCodeError("");
    }

    return valid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');
    const roles = JSON.parse(localStorage.getItem('roles'));
    const facultyRoleNumber = 1984;

    console.log(accessToken);
    console.log(roles);

    if (validationForm()) {
      if (roles && roles.includes(facultyRoleNumber)) {
        axios.post('http://localhost:8000/enroll/api/cen', enrollmentData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
          .then(response => {
            console.log('Enrollment Data Added Successfully');
            console.log(response.data);
            navigate('/Home')
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        console.log('Only faculty users are allowed to create Enrollment.');
      }
    }
  };

  return (
    <>
      {isFaculty ? (
        <div className='flex items-center h-screen bg-slate-800'>
          <div className="max-w-lg p-6 mx-auto bg-gray-100 rounded-lg w-[460px]">
            <h1 className="mb-4 text-3xl font-semibold text-center">Create an Enrollment</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="code" className="block mb-1">Course Code</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={enrollmentData.code}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder='Enter the Course Code'
                  required
                />
              </div>
              {codeError && <div className="ml-4 text-center text-red-400">{codeError}</div>}

              <button type="submit" className="py-2 ml-3 text-white rounded-sm px-36 bg-slate-600 hover:bg-cyan-600">Create Enrollment</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen font-bold text-center text-slate-100 bg-slate-800">
          <div>
            <h1 className='mt-4 text-6xl'>Only Instructors are allowed to Access this Page.</h1>
          </div>
        </div>
      )}
    </>
  );
}

export default EnrollmentForm;
