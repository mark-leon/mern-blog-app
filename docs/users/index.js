const getUsers = require("./get-users");
const getUser = require("./get-user");
const createUser = require("./register");
const loginUser = require("./login");
const updateUser = require("./update-user");
const deleteUser = require("./delete-user");

module.exports = {
  "/user": {
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
};
