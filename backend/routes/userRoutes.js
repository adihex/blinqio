const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword, // Store the hashed password
    });
    await user.save();
    res.status(201).send({
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      error: "Registration failed",
    });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    // Generate the token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'MySuPerSecretUltraSecureKey');
    res.send({ token }); // Return token in response
  } catch (error) {
    res.status(500).send({ error: "Login failed!" });
  }
});

// Get user details
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get the token from the header
    if (!token) return res.status(401).send({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'MySuPerSecretUltraSecureKey');
    const user = await User.findById(decoded.userId).select('-password'); // Exclude the password from the result
    if (!user) return res.status(404).send({ error: "User not found" });

    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve user" });
  }
});

// Update user details
router.put("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'MySuPerSecretUltraSecureKey');
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).send({ error: "User not found" });

    // Update user fields, optionally hash the password if provided
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    await User.findByIdAndUpdate(decoded.userId, req.body, { new: true });
    res.send({ message: "User updated successfully!" });
  } catch (error) {
    res.status(500).send({ error: "Failed to update user" });
  }
});

// Delete a user
router.delete("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'MySuPerSecretUltraSecureKey');
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).send({ error: "User not found" });

    await User.findByIdAndDelete(decoded.userId);
    res.send({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete user" });
  }
});

module.exports = router;

