const basicInfo = require("./basicInfo");
const servers = require("./servers");
const components = require("./components");
const users = require("./users");
const tags = require("./tags");
const posts = require("./posts");
const comments = require("./comments");

module.exports = {
  ...basicInfo,
  ...servers,
  ...components,
  ...tags,
  paths: {
    ...users,
    ...posts,
    ...comments,
  },
};
