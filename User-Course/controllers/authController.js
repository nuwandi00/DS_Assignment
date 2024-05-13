import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        role: user.role,
      },
      process.env.JWT
    );

    const { password, isAdmin, role, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ token,details: { ...otherDetails } });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async(req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(204).json({ message: "No Users Found" });
    }
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getEmailByUsername = async (req, res) => {
  const { username } = req.query; // Retrieve the username from query parameters

  if (!username) {
    return res.status(400).json({ message: 'Enter the Username' });
  }

  try {
    const userEmail = await User.findOne({ username });
    if (!userEmail) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('User Email : ', userEmail.email);
    res.json(userEmail.email);
  } catch (error) {
    console.log('Error retrieving user email : ', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const enrolledModules = async(req, res,next) =>{
  const code = req.body.code;
  const username = req.body.username;
  try {
 
    
    await User.findOneAndUpdate({ username: username }, { $addToSet: { modules: code } }, { upsert: true });

    
    return res.status(200).json({ message: "First login successful" });
  } catch (error) {
    return next(createError(401, "Unauthorized: Invalid token"));
  }
}

/*export const  coursesInModules = async (req, res, next) => {
  const token = req.cookies.access_token;

  try {
    if (!token) {
      return next(createError(401, "Unauthorized: Token not provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT);
    const { username } = decoded;
    const enrollement = await User.findOne({
      username,
    });
    console.log(enrollement.modules);
   
    return res.status(200).json(enrollement.modules);
  } catch (error) {
    return next(createError(401, "Unauthorized: step2"));
  }
};*/

export const coursesInModules = async (req, res) => {
  const { username } = req.query; // Retrieve the username from query parameters

  if (!username) {
    return res.status(400).json({ message: 'Enter the Username' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('User Modules : ', user.modules);
    res.json(user.modules);
  } catch (error) {
    console.log('Error retrieving user Modules : ', error);
    res.status(500).json({ message: "Internal Server Error" });
  }

}
export const removeCourse = async (req, res, next) => {

  const { username,moduleCode } = req.body; // Assuming the module code is passed in the request body

  try {
    // Find the user by ID
    const user = await User.findOne({username});
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the module code exists in user's modules array
    const moduleIndex = user.modules.indexOf(moduleCode);
    if (moduleIndex === -1) {
      return res.status(400).json({ error: "Module code not assigned to the user" });
    }

    // Remove the module code from the user's modules array
    user.modules.splice(moduleIndex, 1);


    // Save the updated user document
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
