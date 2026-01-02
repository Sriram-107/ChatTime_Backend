import express from "express";
import {
  signupController,
  loginController,
  logoutController,
  updateProfile,
} from "../controllers/auth.controller.js";
import protectedRoute from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);

router.put("/update-profile", protectedRoute, updateProfile);

export default router;
