const pool = require("../db");
const router = require("express").Router();
router.post("/post", async (req, res) => {
  try {
    const { title, author, date, content } = req.body;
    const newpost = await pool.query(
      "INSERT INTO posts (title,author,date,content) VALUES($1, $2, $3) RETURNING *",
      [title, author, date, content]
    );

    res.json(newpost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all posts

router.get("/post", async (req, res) => {
  try {
    const allposts = await pool.query("SELECT * FROM posts");
    res.json(allposts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a post

router.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query("SELECT * FROM posts WHERE post_id = $1", [
      id,
    ]);
    res.json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a post

router.put("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, date, content } = req.body;
    const post = await pool.query("SELECT * FROM posts WHERE post_id = $1", [
      id,
    ]);
    if (!post.rows[0]) {
      res.status(404).json({ message: "post not found" });
    }
    const updatepost = await pool.query(
      "UPDATE posts SET title = $1, author = $2, date=$3, content=$4 WHERE post_id = $5",
      [title, author, date, content, id]
    );

    res.json("post was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a post

router.delete("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!post.rows[0]) {
      res.status(404).json({ message: "post not found" });
    }
    const deletepost = await pool.query(
      "DELETE FROM posts WHERE post_id = $1",
      [id]
    );
    res.json("post was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
