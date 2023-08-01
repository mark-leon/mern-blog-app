const verifyToken = require("./verifyToken.js");

module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();
  router.post("/register", user.upload, user.register);
  router.post("/login", user.login);
  router.post("/follow/:id", verifyToken, user.follow);
  router.post("/unfollow/:id", verifyToken, user.unfollow);
  router.get("/followings/:id", verifyToken, user.followingPost);
  router.get("/", verifyToken, user.findAll);
  router.get("/:id", verifyToken, user.findOne);
  router.get("/followers/:id", verifyToken, user.findFollowings);
  router.delete("/:id", verifyToken, user.delete);
  app.use("/api/user", router);
};
