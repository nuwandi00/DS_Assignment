import express from "express";
import {
  createEnrollement,
  deleteEnrollement,
  getEnrollement,
  getEnrollements,
  getEnrollementsSubsequentLogin,
  getEnrollementsSubsequentLogin1,
  updateEnrollement,
  getEnrollementsSubsequentLoginAfter,
  removeStudentFromEnrollment,
  sendNotifications
} from "../controllers/enrollementController.js";
import { verifyAdmin1, verifyStudent1 } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin1, createEnrollement);

//UPDATE
router.put("/:id", verifyAdmin1, updateEnrollement);
//DELETE
router.delete("/find/:id", verifyAdmin1, deleteEnrollement);
//GET

router.get("/find/:id", verifyAdmin1, getEnrollement);
//GET ALL

// router.get("/", verifyAdmin1, getEnrollements);

router.get("/getUsers", sendNotifications);

// For subsequent logins
router.post(
  "/subsequent-login1",
  verifyStudent1,
  getEnrollementsSubsequentLogin1
);
router.post(
  "/subsequent-login",
  getEnrollementsSubsequentLogin
);

router.get("/subsequent", verifyStudent1, getEnrollementsSubsequentLoginAfter);
//router.delete("/remove", verifyStudent1, removeStudentFromEnrollment);
//methanadi delete dekak thiyenawa ethakota eka delete ekak meke remove kiyana eka id eka vidiyata gannawa
//remove eka thiyena route eka id eka ena route eka kiyala hithala execute krama error penna ne
//router.delete("/remove", verifyAdmin1, removeStudentFromEnrollment);

router.delete("/remove", verifyAdmin1, removeStudentFromEnrollment);

export default router;
