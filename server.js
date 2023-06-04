import "dotenv/config.js";
import app from "./src/app.js";

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is up and listening");
});
