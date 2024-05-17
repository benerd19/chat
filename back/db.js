const mysql = require('mysql2')


const connection = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    database: process.env.db_name,
    password: process.env.db_password
}).promise()

module.exports = connection