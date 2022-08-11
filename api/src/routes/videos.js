import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  random,
  subscribe,
  trend,
  updateVideo,
} from "../controllers/video.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.put("/view/:id", addView);
router.get("/find/:id", getVideo);
router.get("/trend", trend);
router.get("/random", random);
router.get("/subscribe", verifyToken, subscribe);
router.get("/tags", getByTag);
router.get("/search", search);

export default router;
