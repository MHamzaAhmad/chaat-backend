import { Router } from "express";
import { generateTokens, refreshToken } from "../services/tokenService.js";
import addFormats from "ajv-formats";
import { create, getUser } from "../controller/user.js";
import { Validator } from "express-json-validator-middleware";
import getUserSchema from "../validator/user.js";
import { localAuth } from "../passport/strategies/localAuth.js";
import { jwtAuth } from "../passport/strategies/jwtStrategy.js";

const userRouter = Router();
const { validate, ajv } = new Validator();

addFormats(ajv);

userRouter
  .route("/")
  .post(validate({ body: getUserSchema(true) }), create, generateTokens)
  .get(jwtAuth, getUser);

userRouter
  .route("/login")
  .post(validate({ body: getUserSchema(true) }), localAuth, generateTokens);

userRouter.route("/refresh").get(refreshToken);

export default userRouter;
