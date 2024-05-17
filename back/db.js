const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    database: 'chat',
    password: '123456'
}).promise()

module.exports = connection