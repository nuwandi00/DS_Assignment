import express from "express";
import { getUsers, getEmailByUsername } from "../controllers/authController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/getEmail", getEmailByUsername);

export default router;
