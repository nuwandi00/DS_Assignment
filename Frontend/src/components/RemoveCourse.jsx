import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
//import { AuthContext } from "../../context/AuthContext";

import space from "../assets/learn4.jpeg";


const Login = () => {
    const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    username: undefined,
    moduleCode: undefined,

  });

 // const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    //dispatch({ type: "LOGIN_START" });
    try {
       await axios.post("http://localhost:8000/api/auth/remove", credentials);
    //  dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/Home");
    } catch (err) {
      //console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        // If the error response contains a message from the backend, set it as the error state
        setError(err.response.data.message);
      } else {
        // If the error doesn't contain a message from the backend, set a general error message
        setError("An error occurred. Please try again later.");
      }
    }
  };
  const navigateToHome = () => {
    navigate("/Home");
  };

  return (
    <>
    

<div class="flex items-center justify-center min-h-screen bg-gray-100">
<div
  class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
>

  <div class="flex flex-col justify-center p-8 md:p-14">
    <span class="mb-3 text-4xl font-bold">Remove Courses</span>
    <span class="font-light text-gray-400 mb-8">
      Please Enter your Username & Module code to remove the module.
    </span>
    <div class="py-4">
      <span class="mb-2 text-md">Username</span>
      <input
        type="text"
        class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        name="username"
          placeholder="username"
          id="username"
          onChange={handleChange}
      />
    </div>
   
    <div class="py-4">
      <span class="mb-2 text-md">Code</span>
      <input
        type="text"
        class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        name="moduleCode"
          placeholder="modulecode"
          id="moduleCode"
          onChange={handleChange}
      />
    </div>
   

   

    <button  onClick={handleClick}
      class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
    >
      Remove Module
    </button>
    {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

            <div className="">
                    <button className="w-48 p-2 text-sm font-medium text-gray-100 hover:text-gray-100 focus:outline-none focus:text-gray-900 bg-cyan-700 center" onClick={navigateToHome}>Back to home</button>
                </div>

 
  </div>

  <div class="relative">
    <img
      src={space}
      alt="img"
      class="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
    />
  
    <div
      class="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
    >
      <span class="text-white text-xl"
        >We've been uesing Untitle to kick"<br />start every new project
        and can't <br />imagine working without it."
      </span>
    </div>
  </div>
</div>
</div>
</>
  );
};

export default Login;