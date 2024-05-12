import express from "express";
const router = express.Router();
import { getAllCourses, getCourse, createCourse, updateCourse, deleteCourse, getCourseCode } from "../controllers/courseController.js";
import verifyRoles from '../middlewares/verifyRoles.js'
import { ROLES_LIST } from '../utils/ROLES_LIST.js'

// //CREATE
// router.post("/", verifyStaff1, createCourse);

// // //UPDATE
// // router.put("/:id", verifyStaff1, updateCourse);
// // //DELETE
// // router.delete("/:id", verifyStaff1, deleteCourse);
// // //GET

// // router.get("/find/:id", verifyStaff1, getCourse);
// // //GET ALL
// // //GET A COURSE
// // router.get("/", verifyStaff1, getAllCourses);

// // router.route('/')
// //   .post(verifyStaff1, createCourse);

router.route('/')
    .post(verifyRoles(ROLES_LIST.Faculty), createCourse)
    .get(getAllCourses);

router.route('/')
    .put(verifyRoles(ROLES_LIST.Faculty), updateCourse);

router.route('/')
    .delete(verifyRoles(ROLES_LIST.Faculty), deleteCourse);

router.route('/find/:id')
    .get(getCourse);

export default router;
