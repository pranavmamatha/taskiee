const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const zod = require("zod");
const jwt = require("jsonwebtoken");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const { User } = require("../db/db");

const signupSchema = zod.object({
  username: zod.string().min(3),
  firstName: zod.string().min(1).max(30),
  lastName: zod.string().min(1).max(30),
  password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "User already exist",
    });
  }

  const user = await User.create(req.body);
  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.status(201).json({
    message: "User Created Successfully",
    token: token,
  });
});

module.exports = router;
