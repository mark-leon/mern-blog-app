module.exports = (app) => {
  const posts = require("../controllers/post.controller.js");
  const verifyToken = require("./verifyToken");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", verifyToken, posts.create);

  // Retrieve all posts
  router.get("/", verifyToken, posts.findAll);

  // Retrieve all published posts
  router.get("/published", verifyToken, posts.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", verifyToken, posts.findOne);

  // Update a Tutorial with id
  router.put("/:id", verifyToken, posts.update);

  // Delete a Tutorial with id
  router.delete("/:id", verifyToken, posts.delete);

  // Delete all posts
  router.delete("/", verifyToken, posts.deleteAll);

  app.use("/api/posts", router);
};
