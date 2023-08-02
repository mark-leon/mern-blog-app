const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(403).send("Token is required");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY, {
      expiresIn: "1h",
    });
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Token is invalid");
  }
  return next();
};

module.exports = verifyToken;
