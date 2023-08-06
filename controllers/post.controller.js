const db = require("../model");
const Post = db.posts;
const User = db.users;
const Like = db.likes;
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|svg|webp/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Post
  const post = {
    image: req.file.path,
    title: req.body.title,
    subtitle: req.body.subtitle,
    category: req.body.category,
    tag: req.body.tag,
    content: req.body.content,
    published: req.body.published ? req.body.published : false,
    userId: req.body.userId,
  };

  // Save Post in the database
  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Post.",
      });
    });
};

exports.findAll = async (req, res) => {
  try {
    // Fetch the most recent 20 posts
    const { page } = req.params;
    const postsPerPage = 5;
    const offset = (page - 1) * postsPerPage;

    // Fetch the most recent posts sorted by createdAt in descending order
    const posts = await Post.findAll({
      include: ["user", "comments"],
      limit: postsPerPage,
      offset,
    });

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Find a single Post with an id
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, { include: ["comments", "user"] });
    const user = await User.findByPk(post.userId);

    const followerIds = (await user.getFollowers()).map(
      (following) => following.id
    );
    post.dataValues.userFollowers = followerIds;
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: error });
  }
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Post with id=" + id,
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id,
      });
    });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Posts were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Posts.",
      });
    });
};

// find all published Post
exports.findAllPublished = (req, res) => {
  Post.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Posts.",
      });
    });
};

//find the list of tag

exports.getTag = async (req, res) => {
  try {
    const tags = await Post.findAll({
      attributes: ["tag"], // Fetch only the 'tag' field from the database
      group: ["tag"], // Group the results by 'tag'
    });

    // Extract tag values from the results
    const uniquetags = tags.map((post) => post.tag);

    res.status(200).json({ tags: uniquetags });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Like any post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    // Check if the post and user exist
    const post = await Post.findByPk(postId);
    const user = await User.findByPk(userId);

    if (!post || !user) {
      return res.status(404).json({ error: "Post or User not found" });
    }

    // Check if the user has already liked the post
    const existingLike = await Like.findOne({ where: { userId, postId } });

    if (existingLike) {
      return res.status(400).json({ error: "User has already liked the post" });
    }

    // Create a new like
    await Like.create({ userId, postId });
    const likesCount = await Like.count({ where: { postId } });

    res.json({ message: "Post liked successfully", likesCount });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Dislike a post
exports.dislikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    // Check if the post and user exist
    const post = await Post.findByPk(postId);
    const user = await User.findByPk(userId);

    if (!post || !user) {
      return res.status(404).json({ error: "Post or User not found" });
    }

    // Check if the user has already liked the post
    const existingLike = await Like.findOne({ where: { userId, postId } });

    if (!existingLike) {
      return res.status(400).json({ error: "User has not liked the post" });
    }

    // Delete the existing like
    await existingLike.destroy();
    const likesCount = await Like.count({ where: { postId } });

    res.json({ message: "Post disliked successfully", likesCount });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//most recent post

exports.mostRecentPosts = async (req, res) => {
  try {
    // Fetch the most recent 20 posts
    const { page } = req.query;
    const postsPerPage = 5;
    const offset = (page - 1) * postsPerPage;

    // Fetch the most recent posts sorted by createdAt in descending order
    const mostRecentPosts = await Post.findAll({
      include: ["user", "comments"],
      order: [["createdAt", "DESC"]],
      limit: postsPerPage,
      offset,
    });

    res.json({ mostRecentPosts });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
