import express from "express";
const router = express.Router();
import {
    createEnrollement,
    deleteEnrollement,
    getEnrollement,
    getEnrollements,
    getEnrollementsSubsequentLogin,
    getEnrollementsSubsequentLogin1,
    getEnrollementsSubsequentLogin0,
    updateEnrollement,
    getEnrollementsSubsequentLoginAfter,
    removeStudentFromEnrollment,
    sendNotifications
  } from "../controllers/enrollementController.js";
import verifyRoles from '../middlewares/verifyRoles.js'
import { ROLES_LIST } from '../utils/ROLES_LIST.js'



router.route('/')
    .post( createEnrollement)
    .get(getEnrollements);

router.route('/')
    .put(verifyRoles(ROLES_LIST.Faculty), updateEnrollement);

router.route('/id')
    .delete(deleteEnrollement);

router.route('/find/:id')
    .get(getEnrollement);

export default router;
