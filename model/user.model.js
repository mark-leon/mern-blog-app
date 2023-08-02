module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
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
