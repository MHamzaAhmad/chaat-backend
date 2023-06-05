import { Router } from "express";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router;
