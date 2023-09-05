import express from "express";
import { addComment, getCommentById } from "../controller/CommentConrtoller.js";

const router = express.Router();

router.post("/comments", addComment);
router.get("/comments/:postId", getCommentById);

export default router;
