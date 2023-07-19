module.exports = (app) => {
  const comment = require("../controllers/comment.controller");
  const verifyToken = require("./verifyToken");
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", verifyToken, comment.createComment);

  // Retrieve all Tutorials
  router.get("/:id", verifyToken, comment.findCommentById);
  router.get("/", verifyToken, comment.findAll);
  router.delete("/", verifyToken, comment.deleteAll);
  app.use("/api/comment", router);
};
