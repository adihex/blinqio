const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//We are creating the user schema. We want unique usernames for each user.
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);  // Adding salt rounds as the second argument
    }
    next();
});

module.exports = mongoose.model("User", userSchema)
