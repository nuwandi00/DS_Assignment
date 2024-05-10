import express from "express";
const router = express.Router();
import { getAllCourses, getCourse, createCourse, updateCourse, deleteCourse, getCourseCode } from "../controllers/courseController.js";
import { verifyStaff1 } from "../utils/verifyToken.js";
import upload from "../utils/upload.js";

//CREATE
router.post("/", verifyStaff1, createCourse);

// //UPDATE
// router.put("/:id", verifyStaff1, updateCourse);
// //DELETE
// router.delete("/:id", verifyStaff1, deleteCourse);
// //GET

// router.get("/find/:id", verifyStaff1, getCourse);
// //GET ALL
// //GET A COURSE
// router.get("/", verifyStaff1, getAllCourses);

// router.route('/')
//   .post(verifyStaff1, createCourse);

export default router;
