import express from "express";
import {
  deleteUser,
  dislikeVideo,
  getUser,
  likeVideo,
  subscribeUser,
  unsubscribeUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//update user
router.put("/:id", verifyToken, updateUser);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscrtibe to a user
router.put("/subscribe/:id", verifyToken, subscribeUser);

//unsubscribe from a user
router.put("/unsubscribe/:id", verifyToken, unsubscribeUser);

//like a video
router.put("/like/:videoId", verifyToken, likeVideo);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislikeVideo);

export default router;
