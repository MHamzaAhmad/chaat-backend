import { Router } from "express";
import { generateTokens } from "../services/tokenService.js";
import addFormats from "ajv-formats";
import { create } from "../controller/user.js";
import { Validator } from "express-json-validator-middleware";
import getUserSchema from "../validator/user.js";
import { localAuth } from "../passport/strategies/localAuth.js";

const userRouter = Router();
const { validate, ajv } = new Validator();

addFormats(ajv);

userRouter
  .route("/")
  .post(validate({ body: getUserSchema(true) }), create, generateTokens);

userRouter
  .route("/login")
  .post(validate({ body: getUserSchema(true) }), localAuth, generateTokens);

export default userRouter;
