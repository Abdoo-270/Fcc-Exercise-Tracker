const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide name"],
  },
});

module.exports = mongoose.model("User", UserSchema);
