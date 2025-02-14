const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");

dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/task", taskRoute);

app.listen(PORT, () => {
  console.log("Listening at port", PORT);
});
