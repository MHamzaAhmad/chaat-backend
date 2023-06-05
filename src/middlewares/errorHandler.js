import { ValidationError } from "express-json-validator-middleware";

const errorHandler = (err, req, res, next) => {
  //log the error in console in test and dev env
  if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "dev")
    console.log(err);

  if (err instanceof ValidationError) {
    const errors = err.validationErrors.body.map((e) => e.message);
    return res.status(400).send({ msg: errors });
  } else {
    return res
      .status(err.status || 500)
      .send({ msg: err.message || "Internal server error" });
  }
};

export default errorHandler;
