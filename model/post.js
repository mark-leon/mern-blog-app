const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, default: null },
  content: { type: String, default: null },
});

module.exports = mongoose.model("user", postSchema);
