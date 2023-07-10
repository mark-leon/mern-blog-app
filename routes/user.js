const pool = require("../db");
const router = require("express").Router();
router.post("/user", async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name,email) VALUES($1, $2, $3) RETURNING *",
      [first_name, last_name, email]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all users

router.get("/user", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a user

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a user

router.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    if (!user.rows[0]) {
      res.status(404).json({ message: "user not found" });
    }
    const updateuser = await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, email=$3 WHERE user_id = $4",
      [first_name, last_name, email, id]
    );

    res.json("User was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a user

router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!user.rows[0]) {
      res.status(404).json({ message: "user not found" });
    }
    const deleteUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [id]
    );
    res.json("User was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
