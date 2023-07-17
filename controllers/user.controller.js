const db = require("../model");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async function (req, res) {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input os required");
    }
    const existingEmail = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingEmail) {
      return res
        .status(400)
        .send({ message: "Failed! Email is already in use" });
    }
    const salt = await bcrypt.genSalt(10);
    var usr = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
    };
    created_user = await User.create(usr);
    res.status(201).json(created_user);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

exports.login = async function (req, res) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      const password_valid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (password_valid) {
        token = jwt.sign(
          { id: user.id, email: user.email, first_name: user.first_name },
          process.env.TOKEN_KEY
        );
        return res.status(200).json({ token: token });
      } else {
        return res.status(400).json({ error: "Password Incorrect" });
      }
    }
  } catch (error) {
    return res.status(404).json({ error: "User does not exist" });
  }
};
