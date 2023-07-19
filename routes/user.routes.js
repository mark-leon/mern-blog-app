const verifyToken = require("./verifyToken.js");

module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();
  router.post("/register", user.register);
  router.post("/login", user.login);
  router.get("/", verifyToken, user.findAll);
  router.get("/:id", verifyToken, user.findOne);
  router.delete("/:id", verifyToken, user.delete);
  app.use("/api/user", router);
};
