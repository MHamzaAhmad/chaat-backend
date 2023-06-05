import express from "express";
import morgan from "morgan";
import router from "./router.js";
import errorHandler from "./middlewares/errorHandler.js";
import _initializePassport from "./passport/passport.js";
import connectDB from "./config/connection.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

await connectDB();

app.use("/api", router);

app.use(errorHandler);

export default app;
