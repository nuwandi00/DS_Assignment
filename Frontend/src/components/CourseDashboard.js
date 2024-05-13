import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Form , InputGroup } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

function CourseDashboard() {
    const [isFaculty, setIsFaculty] = useState(false);
    const [courses, setCourses] = useState([]);
    const [updatedPost, setUpdatedPost] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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

    const updatePost = (post) => {
        setUpdatedPost(post);
        handleShow();
    }
    
    const handleChange = (e) => {
        const { name, value} = e.target;
    
        setUpdatedPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const saveUpdatedPost = () => {
        const facultyRoleNumber = 1984;
        const accessToken = localStorage.getItem('accessToken');
        const roles = JSON.parse(localStorage.getItem('roles'));
        const id = localStorage.getItem('courseId');
        const { name, code, description, courseFee } = updatedPost;
    
        if (roles && roles.includes(facultyRoleNumber)) {
            axios.put(`http://localhost:8000/api/course`, {
                id,
                name,
                code,
                description,
                courseFee
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then((res) => {
                console.log('Course updated successfully');
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.error('Error updating course:', err);
                console.log();
            });
        } else {
            console.log('Only faculty users are allowed to update courses.');
        }
    
        handleClose();
    };
    

    const deleteCourse = () => {
        const facultyRoleNumber = 1984;
        const accessToken = localStorage.getItem('accessToken');
        const roles = JSON.parse(localStorage.getItem('roles'));
        const id = localStorage.getItem('courseId');
        
        if (roles && roles.includes(facultyRoleNumber)) {
            const confirmation = window.confirm("Do you want to delete this course?");
            if (confirmation) {
                axios.delete('http://localhost:8000/api/course', {
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
        navigate("/create");
    };

  return (
    <>
        {isFaculty ? (
            <div className="flex flex-col mt-2 lg:flex-none">
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title style={{color:"#373B61", fontWeight:"bold", marginLeft:"21%"}}>Update Course</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width:"100%", height:"200%"}}>
                    <Form>
                        <Form.Group>
                            <Form.Control 
                                style={{ width: "80%", padding: "6px 10px", margin: "10px 0", border: "1px solid #373B61", borderRadius: "5px", boxSizing: "border-box", display: "block", marginLeft: "10%" }}
                                name="name"
                                value={updatedPost.name ? updatedPost.name : ""}
                                onChange={handleChange}
                            />
                        
                            <Form.Control 
                                style={{ width: "80%", padding: "6px 10px", margin: "10px 0", border: "1px solid #373B61", borderRadius: "5px",boxSizing: "border-box", display: "block", marginLeft: "10%" }}
                                name="code"
                                value={updatedPost.code ? updatedPost.code : ""}
                                onChange={handleChange}
                            />

                            <Form.Control 
                                style={{ width: "80%", padding: "6px 10px", margin: "10px 0", border: "1px solid #373B61", borderRadius: "5px", boxSizing: "border-box", display: "block", marginLeft: "10%" }}
                                name="description"
                                value={updatedPost.description ? updatedPost.description : ""}
                                onChange={handleChange}
                            />

                            <Form.Control 
                                style={{ width: "80%", padding: "6px 10px", margin: "10px 0", border: "1px solid #373B61", borderRadius: "5px", boxSizing: "border-box", display: "block", marginLeft: "10%"}}
                                name="courseFee"
                                value={updatedPost.courseFee ? updatedPost.courseFee : ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        style={{ borderRadius:"5px", background:"#373B61", padding:"1.5%", width:"200px", fontSize:"17px", border:"#373B61", marginRight:"25%", color:"white" }} 
                        onClick={saveUpdatedPost}>
                            Save Changes
                    </button>
                    <button style={{ borderRadius:"5px", background:"#373B61", padding:"1.5%", width:"200px", fontSize:"17px", border:"#373B61", marginRight:"25%", color:"white" }} onClick={handleClose}>
                        Close
                    </button>
                    <br /> 
                </Modal.Footer>
            </Modal>
                <div className="flex items-center justify-between mt-4 ml-[1300px] lg:flex-none">
                    <button className="w-48 p-2 text-sm font-medium text-gray-100 hover:text-gray-100 focus:outline-none focus:text-gray-900 bg-cyan-700" onClick={navigateToForm}>Create Course</button>
                </div>
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
                        <tr key={course.id}>
                        <td className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap">{course.name}</td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">${course.courseFee}</td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">{course.code}</td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            <button className="mr-40 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900" onClick={() => updatePost(course)}>Update</button>
                            <button className="text-sm font-medium text-red-700 hover:text-red-900 focus:outline-none focus:text-red-900" onClick={deleteCourse}>Delete</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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

export default CourseDashboard
