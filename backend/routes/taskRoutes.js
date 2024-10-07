const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      user: req.user_id,
    });

    await task.save();
    res.status(201).send(task); // Sending 201 if resource(task) is successfully created!
  } catch (error) {
    res.status(400).send({
      error: "Could not create the task!",
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user_id });
    res.send(tasks);
  } catch (error) {
    res.status(500).send({
      error: `Could not fetch tasks`,
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user_id,
    });
  } catch (error) {
    res.status(500).send({
      error: `Could not delete task!`,
    });
  }
});

module.exports = router;
