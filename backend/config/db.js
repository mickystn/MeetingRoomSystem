require("dotenv").config();
const mysql = require('mysql2');

const db = mysql.createConnection('mysql://pz1gr10qi50g8n16i1i5:pscale_pw_fkHnaqPycoSUkcaiu63LUiu04Q4qjclBCZSXLtVDydb@aws.connect.psdb.cloud/db-meetingroom?ssl={"rejectUnauthorized":true}'
);

module.exports = db;