const dotenv = require("dotenv").config();
const mysql = require("mysql2/promise");
const fs = require("fs/promises");


const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

async function connect_TO_DB() {
  try {
    const connection = await mysql.createConnection({
      host: HOST,
      user: USER,
      password: PASSWORD,
      multipleStatements: true,
    });

    console.log("Connection Created Successfully");
    return connection;

  } catch (err) {
    console.error("Database Connection Failed:", err.message);
  }
}

module.exports = connect_TO_DB;