const getPosts = require("./get-posts");
const getPost = require("./get-post");
const createPost = require("./create-post");
const updatePost = require("./update-post");
const deletePost = require("./delete-post");
const deleteAllPosts = require("./delete-all-posts");
const getPublishedPosts = require("./get-published-posts");
const getAllTags = require("./get-tags");
const likePosts = require("./like-post");
const dislikePosts = require("./dislike-post");
const singleUserPosts = require("./get-single-posts");

module.exports = {
  "/posts": {
    ...createPost,
    ...deleteAllPosts,
  },
  "/posts/all?userId={number}&page={number}&postsPerPage={number}": {
    ...getPosts,
  },
  "/posts/published": {
    ...getPublishedPosts,
  },
  "/posts/tags": {
    ...getAllTags,
  },
  "/posts/{id}": {
    ...getPost,
    ...updatePost,
    ...deletePost,
  },
  "/posts/{id}/like": {
    ...likePosts,
  },
  "/posts/{id}/dislike": {
    ...dislikePosts,
  },
  "/posts?userId={number}&page={number}": {
    ...singleUserPosts,
  },
};
