const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const zod = require("zod");
const jwt = require("jsonwebtoken");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const { User } = require("../db/db");

const signupSchema = zod.object({
  username: zod.string().min(3).max(30),
  firstName: zod.string().min(1).max(30),
  lastName: zod.string().min(1).max(30),
  password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
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

const siginSchema = zod.object({
  username: zod.string().min(3).max(30),
  password: zod.string().min(6),
});

router.post("/signin", async (req, res) => {
  const { success } = siginSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne(req.body);

  if (user) {
    const userId = user._id;
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );
    return res.json({
      token: token,
    });
  }
  res.json({
    message: "Incorrect password or username",
  });
});

module.exports = router;
