import express from "express";
import {
  createEnrollement,
  deleteEnrollement,
  getEnrollement,
  getEnrollements,
  updateEnrollement,
  paidUsers,
} from "../controller/paidController.js";
import { verifyAdmin1, verifyStudent1 } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", createEnrollement);

//UPDATE
router.put("/:id", verifyAdmin1, updateEnrollement);
//DELETE
router.delete("/find/:id", verifyAdmin1, deleteEnrollement);
//GET

router.get("/find/:id", verifyAdmin1, getEnrollement);
//GET ALL

router.get("/", verifyAdmin1, getEnrollements);

router.get("/paid", paidUsers);

export default router;
