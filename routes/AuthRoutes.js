import express from "express";
import {
  register,
  login,
  logout,
  getToken,
} from "../controller/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/token", getToken);

export default router;
