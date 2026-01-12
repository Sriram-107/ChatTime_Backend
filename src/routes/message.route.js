import express from "express";
import protectedRoute from "../middleware/auth.middleware.js";
import {
  getChatUsersController,
  getUserMessagesController,
  postMessageController,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectedRoute, getChatUsersController);
router.get("/messages/:id", protectedRoute, getUserMessagesController);
router.post("/send/:id", protectedRoute, postMessageController);

export default router;
