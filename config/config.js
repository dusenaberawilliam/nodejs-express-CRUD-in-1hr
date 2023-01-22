require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    // password: null,
    database: process.env.DB_DATABASE,
    host: process.env.BD_LOCALHOST,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
