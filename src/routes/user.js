import { Router } from "express";
import { generateTokens } from "../services/tokenService.js";
import addFormats from "ajv-formats";
import { create } from "../controller/user.js";
import { Validator } from "express-json-validator-middleware";
import getUserSchema from "../validator/user.js";

const userRouter = Router();
const { validate, ajv } = new Validator();

addFormats(ajv);

userRouter
  .route("/")
  .post(validate({ body: getUserSchema(true) }), create, generateTokens);

export default userRouter;
