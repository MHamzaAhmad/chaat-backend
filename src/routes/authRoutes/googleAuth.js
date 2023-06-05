import express from "express";
import passport from "passport";
import {
  googleAuth,
  googleAuthCallback,
} from "../../passport/strategies/googleStrategy.js";
import { generateTokens } from "../../services/tokenService.js";

const googleRouter = express.Router();

googleRouter.route("/").get(googleAuth);

googleRouter.route("/callback").get(googleAuthCallback, generateTokens);

export default googleRouter;
