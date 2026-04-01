import express from "express";
import { createTask, getTasks } from "../controllers/task.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);

export default router;