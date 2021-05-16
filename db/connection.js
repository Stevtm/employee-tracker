const mysql = require("mysql2");
require("dotenv").config();

// connect to the database
const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASS,
	database: process.env.MYSQL_DB,
});

module.exports = db;
