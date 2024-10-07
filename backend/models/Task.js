const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Fix the typo here (it's 'required' not 'reuqired')
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Fix the 'required' field here
});


module.exports = mongoose.model("Task", taskSchema)
