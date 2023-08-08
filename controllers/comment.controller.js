const db = require("../model");
const Comment = db.comments;
const User = db.users;

// Create and Save a new Comment
exports.createComment = async (req, res) => {
  try {
    // Validate request
    if (!req.body.commented_by || !req.body.text || !req.body.postId) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
    const user = await User.findByPk(req.body.commented_by);
    const comment = {
      commented_by: user,
      text: req.body.text,
      postId: req.body.postId,
    };

    // Create a Comment
    // Save comment in the database
    created_comment = await Comment.create(comment);
    return res.status(201).json(created_comment);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.findAll = (req, res) => {
  Comment.findAll({ include: ["post"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.findCommentById = (id) => {
  return Comment.findByPk(id, { include: ["post"] })
    .then((comment) => {
      res.send(comment);
    })
    .catch((err) => {
      console.log(">> Error while finding comment: ", err);
    });
};

exports.deleteSingleComment = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete comment with id=${id}. Maybe Comment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete comment with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Comment.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: ` Comments were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all comments.",
      });
    });
};
