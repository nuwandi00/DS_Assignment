import express from "express";
import { login, register, getUsers, getEmailByUsername } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUsers);
router.get("/getEmail", getEmailByUsername);

export default router;
