import express from "express";
import { getUserInfo, updateUser } from "../controller/UserController.js";

const router = express.Router();

router.get("/user", getUserInfo);
router.patch("/user", updateUser);

export default router;
