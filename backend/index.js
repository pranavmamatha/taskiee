const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const userRoute = require("./routes/user");
const todoRoute = require("./routes/todo");

dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/todo", todoRoute);

app.listen(PORT, () => {
  console.log("Listening at port", PORT);
});
