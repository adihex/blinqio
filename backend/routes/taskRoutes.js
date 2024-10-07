const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {  // Protected route
  try {
    const task = new Task({
      ...req.body,
      user: req.user._id,  // Use req.user._id, which was set by the auth middleware
    });

    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ error: "Could not create the task!" });
  }
});

router.get("/", auth, async (req, res) => {  // Protected route
  try {
    const tasks = await Task.find({ user: req.user._id });  // Use req.user._id from the auth middleware
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: "Could not fetch tasks" });
  }
});

router.delete("/:id", auth, async (req, res) => {  // Protected route
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,  // Ensure task belongs to the authenticated user
    });

    if (!task) {
      return res.status(404).send({ error: "Task not found!" });
    }

    res.send(task);
  } catch (error) {
    res.status(500).send({ error: "Could not delete task!" });
  }
});

module.exports = router;

