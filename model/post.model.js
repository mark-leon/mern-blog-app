module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    published: {
      type: DataTypes.BOOLEAN,
    },
    // numberOfLikes: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 0,
    // },
    // likedUsers: { type: DataTypes.JSON, defaultValue: [] },
  });

  return Post;
};
