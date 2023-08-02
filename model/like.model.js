// const { DataTypes } = require('sequelize');
// const sequelize = require('../database');

// const Like = sequelize.define('Like', {});

// module.exports = Like;

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("like", {});

  return Like;
};
