require("dotenv").config();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");
const router = require("express").Router();

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input os required");
    }
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE user_id=$1",
      [email]
    );
    if (existingUser) {
      return res.status(409).send("User already exists");
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await pool.query(
      "INSERT INTO users (first_name, last_name,email,password) VALUES($1, $2, $3) RETURNING *",
      [first_name, last_name, email, encryptedPassword]
    );

    const token = jwt.sign(
      { user_id: user.user_id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await pool.query("SELECT * FROM users WHERE user_id=$1", [
      email,
    ]);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.user_id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "1h" }
      );
      user.token = token;
      res.status(200).json(user);
    }
    res.status(400).send("Invalid credentials");
  } catch (err) {
    console.log(err);
  }
});

router.get("/alive", verifyToken, async (req, res) => {
  res.status(200).send("Welcome");
});

router.use("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = router;
