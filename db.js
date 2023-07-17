module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "new_password",
  DB: "blog",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
