import express from "express";
import {
  getAllPost,
  addPost,
  getPostById,
} from "../controller/PostController.js";

const router = express.Router();

router.post("/post", addPost);
router.get("/post", getAllPost);
router.get("/profile-post", getPostById);

export default router;
