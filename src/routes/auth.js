import express from "express";
import googleRouter from "./authRoutes/googleAuth.js";

const authRouter = express.Router();

authRouter.use("/google", googleRouter);

export default authRouter;
