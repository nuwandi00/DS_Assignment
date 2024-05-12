import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CourseForm() {
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    courseFee: '',
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
    setCourseData({ ...courseData, [name]: value });
  };

  const [nameError, setNameError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [feeError, setFeeError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const validationForm = () => {
    let valid = true;

    const Amount = document.getElementById('courseFee');
    if (courseData.courseFee == '') {
        Amount.setCustomValidity('Please Enter the Amount');
        setFeeError("Please Enter the Amount");
        valid = false;
    }
    else {
        Amount.setCustomValidity('');
        setFeeError("");
    }

    const Code = document.getElementById('code');
    if (courseData.code == '') {
        Code.setCustomValidity('Please Enter the Course Code');
        setCodeError("Please Enter the Course Code");
        valid = false;
    } else {
        Code.setCustomValidity('');
        setCodeError("");
    }

    const Name = document.getElementById('name');
    if (courseData.name == '') {
        Name.setCustomValidity('Please Enter the Course Name');
        setNameError("Please Enter the Course Name");
        valid = false;
    } else {
        Name.setCustomValidity('');
        setNameError("");
    }

    const Description = document.getElementById('description');
    if (courseData.description == '') {
        Description.setCustomValidity('Please enter a Description');
        setDescriptionError("Please enter a Description");
        valid = false;
    } else {
        Description.setCustomValidity('');
        setDescriptionError("");
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
        axios.post('http://localhost:8000/api/course', courseData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            console.log('Course Data Added Successfully');
            console.log(response.data);
            navigate('/Home')
        })
        .catch(error => {
            console.error('Error:', error);
        });
      } else {
          console.log('Only faculty users are allowed to create courses.');
      }
    }
  };

  return (
    <>
      {isFaculty ? (
        <div className='flex items-center h-screen bg-slate-800'>
          <div className="max-w-lg p-6 mx-auto bg-gray-100 rounded-lg w-[460px]">
            <h1 className="mb-4 text-3xl font-semibold text-center">Create a Course</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1">Course Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={courseData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder='Enter the Course Name'
                  required
                />
              </div>
              { nameError && <div className="ml-4 text-center text-red-400">{nameError}</div> }

              <div className="mb-4">
                <label htmlFor="description" className="block mb-1">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={courseData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder='Enter the Course Description'
                  required
                ></textarea>
              </div>
              { descriptionError && <div className="ml-4 text-center text-red-400">{descriptionError}</div> }

              <div className="mb-4">
                <label htmlFor="courseFee" className="block mb-1">Course Fee</label>
                <input
                  type="text"
                  id="courseFee"
                  name="courseFee"
                  value={courseData.courseFee}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder='Enter the Course Fee'
                  required
                />
              </div>
              { feeError && <div className="ml-4 text-center text-red-400">{feeError}</div> }

              <div className="mb-4">
                <label htmlFor="code" className="block mb-1">Course Code</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={courseData.code}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder='Enter the Course Code'
                  required
                />
              </div>
              { codeError && <div className="ml-4 text-center text-red-400">{codeError}</div> }

              <button type="submit" className="py-2 ml-3 text-white rounded-sm px-36 bg-slate-600 hover:bg-cyan-600">Create Course</button>
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

export default CourseForm;
