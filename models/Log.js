const mongoose = require("mongoose");
const LogSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    count: {
      type: Number,
    },
    log: {
      type: Array,
      default: [], // Initialize it as an empty array
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", LogSchema);
