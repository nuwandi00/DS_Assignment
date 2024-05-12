import express from "express";
import { getUsers, getEmailByUsername, enrolledModules, coursesInModules } from "../controllers/authController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/getEmail", getEmailByUsername);
router.post("/enrollmodules", enrolledModules);
router.get("/modules",coursesInModules);

export default router;
