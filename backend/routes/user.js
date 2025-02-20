const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const zod = require("zod");
const jwt = require("jsonwebtoken");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const { User, Task } = require("../db/db");
const { authMiddleware } = require("../middleware");

const signupSchema = zod.object({
  username: zod.string().email().min(3).max(30),
  firstName: zod.string().min(1).max(30),
  lastName: zod.string().min(1).max(30),
  password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.json({
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
  username: zod.string().email().min(3).max(30),
  password: zod.string().min(6),
});

router.post("/signin", async (req, res) => {
  const { success } = siginSchema.safeParse(req.body);
  if (!success) {
    return res.json({
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

router.get("/profile", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const userInformation = await User.findOne({ _id: userId });
  const totalTasks = await Task.countDocuments({
    userId: userId,
  });
  const completedTasks = await Task.countDocuments({
    userId: userId,
    completed: true,
  });
  const pendingTasks = await Task.countDocuments({
    userId: userId,
    completed: false,
  });
  res.json({
    username: userInformation.username,
    firstName: userInformation.firstName,
    lastName: userInformation.lastName,
    total: totalTasks,
    completed: completedTasks,
    pending: pendingTasks,
  });
});

module.exports = router;
