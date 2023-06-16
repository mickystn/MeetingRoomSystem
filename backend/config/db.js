require("dotenv").config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    user:"admin",
    host: "meetingroom.c529p3llzbxh.us-east-1.rds.amazonaws.com",
    password: "Mannmixx2110!",
    database: "meetingroom",
});

module.exports = db;