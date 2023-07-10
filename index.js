const express = require("express");
const app = express();
app.use(express.json());
const authRoute = require("./middleware/auth");
app.use("/api/auth", authRoute);

// const postRoute = require("./middleware/post")
// const userRoute = require("./middleware/user")
// const server = http.createServer(app);
require("./config/database").connect();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
