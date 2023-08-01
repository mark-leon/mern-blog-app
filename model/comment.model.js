module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    commented_by: {
      type: DataTypes.JSON,
    },
    text: {
      type: DataTypes.TEXT,
    },
  });

  return Comment;
};
