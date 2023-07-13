module.exports = (app) => {
  const comment = require("../controllers/comment.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", comment.createComment);

  // Retrieve all Tutorials
  router.get("/:id", comment.findCommentById);
  router.get("/", comment.findAll);
  router.delete("/", comment.deleteAll);
  app.use("/api/comment", router);
};
