module.exports = (app) => {
  const posts = require("../controllers/post.controller.js");
  const verifyToken = require("./verifyToken");
  // const upload = require("../controllers/upload.controller.js");

  var router = require("express").Router();

  // Create a new posts
  router.post("/", verifyToken, posts.upload, posts.create);

  // Retrieve all posts
  router.get("/all/:page", verifyToken, posts.findAll);

  // Retrieve all tags
  router.get("/tags", verifyToken, posts.getTag);

  // Retrieve all published posts
  router.get("/published", verifyToken, posts.findAllPublished);

  // Retrieve a single post with id
  router.get("/:id", verifyToken, posts.findOne);

  // Retrieve a single user's post with userId and page number
  router.get("/", verifyToken, posts.findSingleUserPosts);

  // Update a post with id
  router.put("/:id", verifyToken, posts.update);

  // Delete a post with id
  router.delete("/:id", verifyToken, posts.delete);

  // Delete all posts
  router.delete("/", verifyToken, posts.deleteAll);

  //like a post
  router.post("/:postId/like", verifyToken, posts.likePost);

  //dislike a post
  router.post("/:postId/dislike", verifyToken, posts.dislikePost);
  router.post("/posts/most-recent", verifyToken, posts.mostRecentPosts);

  app.use("/api/posts", router);
};
