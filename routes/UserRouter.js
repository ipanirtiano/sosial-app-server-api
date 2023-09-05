import express from "express";
import { getUserInfo } from "../controller/UserController.js";

const router = express.Router();

router.get("/user", getUserInfo);

export default router;
