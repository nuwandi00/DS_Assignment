import express from "express";
import { login, register, getUsers, getEmailByUsername, enrolledModules, coursesInModules, removeCourse } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
//router.get("/users", getUsers);
router.get("/getEmail", getEmailByUsername);
router.post("/enrollmodules", enrolledModules);
router.get("/modules",coursesInModules);
router.post("/remove", removeCourse);
export default router;
