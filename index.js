const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRoute = require("./routes/user");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", userRoute);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
