const mongoose = require("mongoose");
const express = require("express");
const app = express();
const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  content: String,
});

const comment = mongoose.model("Comment", commentSchema);

app.post("/api/comments", async (req, res) => {
  try {
    const { postId, content } = req.body;
    const comment = new Comment({ postId, content });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

app.get("/api/comments/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await comment.find({ postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

app.put("/api/comments/:id", async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findByIdAndUpdate(req.params.id, content);
    if (!comment) {
      return res.status(404).json({ err: "Comment not found" });
    }
    res.json(comment);
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

app.delete("/api/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ err: "Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});
