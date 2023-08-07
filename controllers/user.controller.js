const db = require("../model");
const User = db.users;
const Post = db.posts;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Users");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|webp|jpg|png|gif|svg/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");

exports.register = async function (req, res) {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input os required");
    }
    const existingEmail = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingEmail) {
      return res
        .status(400)
        .send({ message: "Failed! Email is already in use" });
    }
    const salt = await bcrypt.genSalt(10);
    var usr = {
      image: req.file.path,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      user_type: req.body.user_type ? req.body.user_type : "user",
    };

    created_user = await User.create(usr);
    return res.status(201).json(created_user);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

exports.login = async function (req, res) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      const password_valid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (password_valid) {
        token = jwt.sign(
          { id: user.id, email: user.email, first_name: user.first_name },
          process.env.TOKEN_KEY
        );
        user.dataValues.token = token;
        return res.status(200).json(user);
      } else {
        return res.status(400).json({ error: "Password Incorrect" });
      }
    }
  } catch (error) {
    return res.status(404).json({ error: "User does not exist" });
  }
};

exports.findAll = (req, res) => {
  User.findAll({ include: ["posts", "likes"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  User.findByPk(id, { include: ["posts"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

//follow user

exports.follow = async (req, res) => {
  try {
    const { id } = req.params;
    const { followId } = req.body;

    const user = await User.findByPk(id);
    const followUser = await User.findByPk(followId);

    if (!user || !followUser) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.addFollowings(followUser);
    res.json({ message: "Followed successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to follow" });
  }
};

//unfollow user
exports.unfollow = async (req, res) => {
  try {
    const { id } = req.params;
    const { followId } = req.body;

    const user = await User.findByPk(id);
    const followUser = await User.findByPk(followId);

    if (!user || !followUser) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.removeFollowings(followUser);
    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to unfollow" });
  }
};

// find the user post that the user follows

exports.followingPost = async (req, res) => {
  try {
    const { userId } = req.query;
    const { page } = req.query;
    const postsPerPage = 5;
    const offset = (page - 1) * postsPerPage;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // const admin = await User.find({ where: { user_type: "admin" } });
    const admin = await User.findOne({ where: { user_type: "admin" } });

    // Get the IDs of the users that the current user follows
    const followingIds = (await user.getFollowings()).map(
      (following) => following.id
    );

    // Get the posts of the users that the current user follows
    const posts = await Post.findAll({
      where: { userId: followingIds, userId: admin.id },
      include: ["user"],
      limit: postsPerPage,
      offset,
    });

    //Get the total pages

    const totalPosts = await Post.count({
      where: { userId: followingIds, userId: admin.id },
    });
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    res.json({ posts, totalPages });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.findFollowings = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followingIds = (await user.getFollowings()).map(
      (following) => following.id
    );
    const allUsers = await User.findAll({ include: ["posts"] });
    // Set "following" to true or false based on the presence of user's ID in the followingIds array
    const usersWithFollowingStatus = allUsers.map((user) => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      image: user.image,
      email: user.email,
      posts: user.posts.length,
      following: followingIds.includes(user.id),
    }));
    res.json(usersWithFollowingStatus);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
