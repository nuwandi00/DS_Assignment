import express from "express";
import {
  getAllContents,
  createContent,
  updateContent,
  deleteContent,
} from "../controllers/contentController.js";
import { verifyStaff1 } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/", verifyStaff1, createContent);
router.put("/:id", verifyStaff1, updateContent);
router.delete("/:id", verifyStaff1, deleteContent);
router.get("/", verifyStaff1, getAllContents);

export default router;
