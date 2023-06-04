import app from "./src/app.js";
import "dotenv/config.js";

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is up and listening");
});
