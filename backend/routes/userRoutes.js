const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      throw new Error();
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET || "MySuPerSecretUltraSecureKey"
    );
  } catch (error) {
    res.status(401).send({
      error: "Login failed!",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.Save();
    res.status(201).send({
      message: "User registered successfully!",
    });
  } catch (error) {
    res.status(400).send({
      error: "Registration failed",
    });
  }
});

module.exports = router;
