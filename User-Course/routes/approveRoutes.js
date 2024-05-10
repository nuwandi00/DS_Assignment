import express from "express";
import { approveCourse } from "../controllers/approveController.js";
import { verifyAdmin1 } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/", verifyAdmin1, approveCourse);

export default router;
