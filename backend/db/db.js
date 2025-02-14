const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { title } = require("process");
dotenv.config();
const { Schema, model } = mongoose;

try {
  mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to mongoose successfully");
} catch (error) {
  console.log("Failed to connect to mongoose");
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    min: 3,
    max: 30,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    minLength: 1,
  },
  description: {
    type: String,
    required: true,
    minLength: 1,
  },
});

const User = model("User", userSchema);
const Task = model("Task", taskSchema);

module.exports = { User, Task };
