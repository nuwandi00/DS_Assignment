import express from "express";
const router = express.Router();
import { login, register, getUsers, getEmailByUsername, enrolledModules, coursesInModules } from "../controllers/authController.js";


router.post("/register", register);
router.post("/login", login);
//router.get("/users", getUsers);
router.get("/getEmail", getEmailByUsername);
router.post("/enrollmodules", enrolledModules);
router.get("/modules",coursesInModules);

export default router;
