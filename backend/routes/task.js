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

router.get("/tasks", authMiddleware, async (req, res) => {
  userId = req.userId;
  const tasks = await Task.find({
    userId: userId,
  });
  res.json(tasks);
});

router.get("/completed", authMiddleware, async (req, res) => {
  userId = req.userId;
  const completedTasks = await Task.find({
    userId: userId,
    completed: true,
  });
  res.json(completedTasks);
});

router.get("/pending", authMiddleware, async (req, res) => {
  userId = req.userId;
  pendingTasks = await Task.find({
    userId: userId,
    completed: false,
  });
  res.json(pendingTasks);
});

const updateTaskSchema = zod.object({
  title: zod.string().optional(),
  description: zod.string().optional(),
  completed: zod.boolean().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  const update = req.query.update || "";
  if (update == "") {
    return res.json({
      message: "Invalid task Id",
    });
  }
  const { success } = updateTaskSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Invalid input",
    });
  }
  await Task.updateOne({ _id: update }, req.body);
  res.json({
    message: "Updated successfully",
  });
});

module.exports = router;
