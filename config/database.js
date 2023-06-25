const mongoose = require("mogoose");
const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedToplogy: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to  database");
    })
    .catch((error) => {
      console.log("connection failed");
      console.log(error);
      process.exit(1);
    });
};
