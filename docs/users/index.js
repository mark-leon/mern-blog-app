const getUsers = require("./get-users");
const getUser = require("./get-user");
const createUser = require("./register");
const loginUser = require("./login");
const updateUser = require("./update-user");
const deleteUser = require("./delete-user");
const followUser = require("./follow-user");
const unfollowUser = require("./unfollow-user");
const followingPost = require("./get-following-posts");

module.exports = {
  "/user?userId={userId}": {
    ...getUsers,
  },
  "/user/register": {
    ...createUser,
  },
  "/user/login": {
    ...loginUser,
  },
  "/users/{id}": {
    ...getUser,
    ...updateUser,
    ...deleteUser,
  },
  "/user/follow/{id}": {
    ...followUser,
  },
  "/user/unfollow/{id}": {
    ...unfollowUser,
  },
  "/user/followings?userId={userId}&page={page}": {
    ...followingPost,
  },
};
