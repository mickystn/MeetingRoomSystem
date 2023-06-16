require("dotenv").config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    user:process.env.username,
    host: process.env.host,
    password: process.env.password,
    database: process.env.database,
});

module.exports = db;