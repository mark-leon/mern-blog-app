// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   password: "new_password",
//   host: "localhost",
//   port: 5432,
//   database: "blog",
// });

// module.exports = pool;

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
