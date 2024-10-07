const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const router = express.Router();

// Create a new task
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

// Retrieve all tasks for the authenticated user
router.get("/", auth, async (req, res) => {  // Protected route
  try {
    const tasks = await Task.find({ user: req.user._id });  // Use req.user._id from the auth middleware
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: "Could not fetch tasks" });
  }
});

// Retrieve a specific task by ID
router.get("/:id", auth, async (req, res) => {  // Protected route
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id  // Ensure task belongs to the authenticated user
    });

    if (!task) {
      return res.status(404).send({ error: "Task not found!" });
    }

    res.send(task);
  } catch (error) {
    res.status(500).send({ error: "Could not fetch the task!" });
  }
});

// Update a task
router.put("/:id", auth, async (req, res) => {  // Protected route
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "completed"]; // Adjust according to your Task model
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id  // Ensure task belongs to the authenticated user
    });

    if (!task) {
      return res.status(404).send({ error: "Task not found!" });
    }

    // Update the task fields
    updates.forEach(update => task[update] = req.body[update]);
    await task.save();

    res.send(task);
  } catch (error) {
    res.status(400).send({ error: "Could not update the task!" });
  }
});

// Delete a task
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
