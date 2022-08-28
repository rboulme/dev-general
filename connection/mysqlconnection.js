// require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
    host: "sql283.main-hosting.eu",
    user: "u410971903_rboul",
    password: "RrBbOoUuLl1234",
    database: "u410971903_tochange",
});

connection.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
  if (connection) connection.release();
  console.log(connection.threadId);
  return;
});

module.exports = connection;
