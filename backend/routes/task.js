const express = require("express");
const zod = require("zod");
const router = express.Router();
const { authMiddleware } = require("../middleware");

const { Task } = require("../db/db");

const taskSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
});

router.post("/create", authMiddleware, async (req, res) => {
  const { success } = taskSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid input",
    });
  }
  const task = await Task.create({
    userId: req.userId,
    title: req.body.title,
    description: req.body.description,
  });

  if (!task) {
    return res.json({
      message: "failed to create a task",
    });
  }
  res.json({
    message: "Succefully created a task",
  });
});

module.exports = router;
