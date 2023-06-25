const jwt = require("jwt");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.params.token ||
    req.headers["x-access-token"];
  if (!token) {
    res.status(403).send("Token is required");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    res.status(401).send("Token is invalid");
  }
  return next();
};

module.exports = verifyToken;
