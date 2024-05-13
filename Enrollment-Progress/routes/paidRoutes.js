import express from "express";
import {
  createEnrollement,
  deleteEnrollement,
  getEnrollement,
  getEnrollements,
  updateEnrollement,
} from "../controllers/paidController.js";
import { verifyAdmin1, verifyStudent1 } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", createEnrollement);

//UPDATE
router.put("/:id",updateEnrollement);
//DELETE
router.delete("/find/:id",  deleteEnrollement);
//GET

router.get("/find/:id", getEnrollement);
//GET ALL

router.get("/", getEnrollements);
export default router;
