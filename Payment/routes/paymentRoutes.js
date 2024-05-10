// const express = require("express");
import express from "express";
const router = express.Router();
import { createPayment } from "../controller/paymentController.js";
// const { createPayment } = require("../controllers/paymentController");

// Get all courses
// router.route("/").get(getCourses);

// Create a new course
router.post("/", createPayment);

// Get course by id
// router.route("/:id").get(getCourse);

// Update course by id
// router.route("/:id").put(checkAdminPermissions, updateCourse);

// Delete course by id
// router.route("/:id").delete(checkAdminPermissions, deleteCourse);

export default router;
