import express from "express";
import { enrolledCourses } from "../controllers/progressController.js";
import { verifyAdmin1, verifyStudent1 } from "../utils/verifyToken.js";


const router = express.Router();

router.get("/enrolled",verifyStudent1, enrolledCourses);


export default router;
