import { Router } from "express";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import chatRouter from "./routes/chat.js";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/chat", chatRouter);

export default router;
