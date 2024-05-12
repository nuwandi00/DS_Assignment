import express from "express";
import { approveCourse, getApprovedCourses } from "../controllers/approveController.js";
import verifyRoles from '../middlewares/verifyRoles.js'
import { ROLES_LIST } from '../utils/ROLES_LIST.js'
const router = express.Router();

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), approveCourse);

router.route('/')
    .get(getApprovedCourses);

export default router;
