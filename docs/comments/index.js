const getComments = require("./get-comments");
const getComment = require("./get-comment");
const createComment = require("./create-comment");
const updateComment = require("./update-comment");
const deleteComment = require("./delete-comment");
const deleteAllComments = require("./delete-allcomment");

module.exports = {
  "/comments": {
    ...getComments,
    ...createComment,
    ...deleteAllComments,
  },
  "/comments/{id}": {
    ...getComment,
    ...updateComment,
    ...deleteComment,
  },
};
