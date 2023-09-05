import express from "express";
import { getLike, addLike, deleteLike } from "../controller/LikeController.js";

const router = express.Router();

router.get("/likes/:postId", getLike);
router.post("/likes", addLike);
router.delete("/likes/:id", deleteLike);

export default router;
