const db = require("../model");
const Comment = db.comments;

// Create and Save a new Comment
exports.createComment = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.text || !req.body.tutorialId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Comment
  const comment = {
    name: req.body.name,
    text: req.body.text,
    tutorialId: req.body.tutorialId,
  };

  // Save comment in the database
  Comment.create(comment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.findAll = (req, res) => {
  Comment.findAll({ include: ["tutorial"] })
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
  return Comment.findByPk(id, { include: ["tutorial"] })
    .then((comment) => {
      res.send(comment);
    })
    .catch((err) => {
      console.log(">> Error while finding comment: ", err);
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
