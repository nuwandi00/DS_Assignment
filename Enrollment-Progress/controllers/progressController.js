
import createError from "http-errors";
import jwt from "jsonwebtoken";


  export const enrolledCourses = async (req, res, next) => {
    const token = req.cookies.access_token;
  
    try {
      if (!token) {
        return next(createError(401, "Unauthorized: Token not provided"));
      }
  
      const decoded = jwt.verify(token, process.env.JWT);
      const { username } = decoded;
      const modules = await fetch(`http://localhost:8000/api/auth/modules?username=${username}`)
        .then((response) => response.json());
        const userModules = modules;
        console.log(userModules);

      
      
      return res.status(200).json(userModules);
    } catch (error) {
      return next(createError(401, "Unauthorized: step2"));
    }
  };
  
  
  
  