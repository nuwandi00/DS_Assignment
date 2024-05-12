import express from "express";
import { getAllContents, createContent, updateContent, deleteContent } from "../controllers/contentController.js";
import verifyRoles from '../middlewares/verifyRoles.js'
import { ROLES_LIST } from '../utils/ROLES_LIST.js'
const router = express.Router();

// router.post("/", verifyStaff1, createContent);
// router.put("/:id", verifyStaff1, updateContent);
// router.delete("/:id", verifyStaff1, deleteContent);
// router.get("/", verifyStaff1, getAllContents);

router.route('/')
  .get(getAllContents)
  .post(verifyRoles(ROLES_LIST.Faculty), createContent);

router.route('/:id')
  .put(verifyRoles(ROLES_LIST.Faculty), updateContent);

router.route('/')
  .delete(verifyRoles(ROLES_LIST.Faculty), deleteContent);


export default router;
