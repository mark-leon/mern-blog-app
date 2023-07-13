module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/register", user.register);

  // Retrieve all Tutorials
  router.post("/login", user.login);
  app.use("/api/user", router);
};
