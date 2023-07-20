const getComments = require("./get-comments");
const getComment = require("./get-comment");
const createComment = require("./create-comment");
const updateComment = require("./update-comment");
const deleteComment = require("./delete-comment");

module.exports = {
  "/comments": {
    ...getComments,
    ...createComment,
  },
  "/comments/{id}": {
    ...getComment,
    ...updateComment,
    ...deleteComment,
  },
};
