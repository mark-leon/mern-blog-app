module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  User.belongsToMany(User, {
    as: "Followers",
    through: "UserFollowers",
    foreignKey: "followingId",
  });
  User.belongsToMany(User, {
    as: "Followings",
    through: "UserFollowers",
    foreignKey: "followerId",
  });

  return User;
};
