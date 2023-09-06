import express from "express";
import { getLike, checkLike } from "../controller/LikeController.js";

const router = express.Router();

router.get("/likes/:postId", getLike);
router.post("/check-like", checkLike);

export default router;
