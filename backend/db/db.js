const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { Schema, model } = mongoose;

try {
  mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to mongoose successfully");
} catch (error) {
  console.log(error);
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

const todoSchema = new Schema({
  todoUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  todo: {
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
const Todo = model("Todo", todoSchema);

module.exports = { User, Todo };
